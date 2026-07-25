"""The Narrate pipeline: a FIXED chain (no model-driven branching), built
with LangGraph purely as an orchestration tool — per the locked-in plan,
Narrate stays deterministic; only the separate Recall feedback agent is
genuinely agentic.

Design note: only the transcript-level steps (normalize, split) are modeled
as LangGraph nodes below. The remaining per-sentence steps from the plan —
classify_island, translate_to_target, embed_and_store — run as plain Python
functions in a loop (`process_narration`), not as further graph nodes.

Why: a LangGraph `StateGraph` runs one path through a fixed set of nodes.
Making it fan out over a *dynamic* number of sentences needs its more
advanced `Send` API, which adds real complexity for no benefit in a chain
that's fixed either way. A plain loop calling ordinary functions is just as
deterministic, and much simpler to read and debug.
"""

import re
import uuid
from typing import TypedDict

from langgraph.graph import END, StateGraph
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.ai import llm
from app.db.models import Island, Sentence, User

# Cosine distance (0 = identical, 2 = opposite) below which a new sentence is
# considered part of an existing island rather than starting a new one.
ISLAND_SIMILARITY_THRESHOLD = 0.25


class NarrateGraphState(TypedDict):
    raw_transcript: str
    normalized_text: str
    sentences: list[str]


def _normalize_transcript_node(state: NarrateGraphState) -> dict:
    return {"normalized_text": llm.normalize_transcript(state["raw_transcript"])}


def _split_sentences_node(state: NarrateGraphState) -> dict:
    # Simple sentence-boundary split — good enough for narrated speech, and
    # needs no extra LLM call since normalize_transcript already punctuated it.
    parts = re.split(r"(?<=[.!?])\s+", state["normalized_text"].strip())
    return {"sentences": [part.strip() for part in parts if part.strip()]}


def _build_narrate_graph():
    graph = StateGraph(NarrateGraphState)
    graph.add_node("normalize_transcript", _normalize_transcript_node)
    graph.add_node("split_sentences", _split_sentences_node)
    graph.set_entry_point("normalize_transcript")
    graph.add_edge("normalize_transcript", "split_sentences")
    graph.add_edge("split_sentences", END)
    return graph.compile()


_narrate_graph = _build_narrate_graph()


def run_narrate_graph(raw_transcript: str) -> list[str]:
    """Runs the fixed normalize -> split chain, returning standalone
    sentences ready for per-sentence classify/translate/embed."""
    result = _narrate_graph.invoke(
        {"raw_transcript": raw_transcript, "normalized_text": "", "sentences": []}
    )
    return result["sentences"]


def classify_island(
    db: Session, user_id: str, sentence_text: str, embedding: list[float]
) -> uuid.UUID:
    """Find the existing island whose sentences are most similar to this new
    one (pgvector cosine-distance nearest neighbour). Falls back to creating
    a new, model-named island if nothing is close enough."""
    row = db.execute(
        select(Sentence.island_id, Sentence.embedding.cosine_distance(embedding).label("distance"))
        .where(Sentence.user_id == user_id, Sentence.island_id.is_not(None))
        .order_by("distance")
        .limit(1)
    ).first()

    if row is not None and row.distance < ISLAND_SIMILARITY_THRESHOLD:
        return row.island_id

    name, description = llm.suggest_island_name(sentence_text)
    island = Island(user_id=user_id, name=name, description=description or None)
    db.add(island)
    db.flush()  # assigns island.id without committing the outer transaction
    return island.id


def process_narration(db: Session, user: User, raw_transcript: str) -> list[Sentence]:
    """Runs the full fixed pipeline for one narrated transcript: normalize ->
    split -> (per sentence) classify_island -> translate -> embed_and_store.

    Only adds rows to `db` (flushed, not committed) — the caller decides
    when to commit, so a failure partway through can be cleanly rolled back.
    """
    sentence_texts = run_narrate_graph(raw_transcript)

    created_sentences: list[Sentence] = []
    for sentence_text in sentence_texts:
        embedding = llm.embed_text(sentence_text)
        island_id = classify_island(db, user.id, sentence_text, embedding)
        target_text = llm.translate_sentence(sentence_text, user.target_language)

        sentence = Sentence(
            user_id=user.id,
            island_id=island_id,
            source_text=sentence_text,
            target_text=target_text,
            embedding=embedding,
        )
        db.add(sentence)
        db.flush()
        created_sentences.append(sentence)

    return created_sentences
