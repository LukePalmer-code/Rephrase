"""OpenAI-backed building blocks for the Narrate pipeline.

Chat/translation calls go through LangChain's model-agnostic `ChatOpenAI`
wrapper — per the locked-in plan, we start with OpenAI directly and may
migrate to AWS Bedrock later; keeping every LLM call behind this one module
means that's a config change here, not a rewrite of every call site.

Whisper transcription uses the raw OpenAI SDK directly instead of LangChain:
there isn't a meaningful "provider-agnostic" abstraction to gain for
speech-to-text the way there is for chat models, so there's nothing to swap.

Other modules should import this module (`from app.ai import llm`) and call
`llm.some_function(...)`, rather than `from app.ai.llm import some_function`
— that keeps these easy to monkeypatch/stub out in tests without needing a
real OpenAI API key.
"""

from functools import lru_cache

from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from openai import OpenAI

from app.core.config import settings

# Only French is supported today (matches content.ts's TARGET_LANGUAGE_LABEL);
# falls back to the raw code for anything else.
_LANGUAGE_NAMES = {"fr-FR": "French"}


@lru_cache
def get_chat_model() -> ChatOpenAI:
    """The one place a chat-capable LLM is constructed."""
    return ChatOpenAI(
        model=settings.openai_chat_model, api_key=settings.openai_api_key, temperature=0
    )


@lru_cache
def get_embeddings_model() -> OpenAIEmbeddings:
    return OpenAIEmbeddings(
        model=settings.openai_embedding_model, api_key=settings.openai_api_key
    )


@lru_cache
def _get_openai_client() -> OpenAI:
    return OpenAI(api_key=settings.openai_api_key)


def embed_text(text: str) -> list[float]:
    """Embed one piece of text (used both to store a new sentence's own
    embedding, and to classify which island it's most similar to)."""
    return get_embeddings_model().embed_query(text)


def transcribe_audio(audio_bytes: bytes, filename: str) -> str:
    """Transcribe narrated audio to text via OpenAI's Whisper model."""
    client = _get_openai_client()
    transcription = client.audio.transcriptions.create(
        model=settings.openai_whisper_model, file=(filename, audio_bytes)
    )
    return transcription.text


def normalize_transcript(raw_transcript: str) -> str:
    """Clean up a raw narrated transcript: fix filler words/false starts and
    add punctuation, without changing meaning, language, or level of detail."""
    response = get_chat_model().invoke(
        [
            (
                "system",
                "You clean up spoken-language transcripts. Fix filler words, "
                "false starts, and punctuation. Keep the same meaning, "
                "language, and level of detail. Return ONLY the cleaned "
                "text, nothing else.",
            ),
            ("human", raw_transcript),
        ]
    )
    return response.content.strip()


def translate_sentence(sentence: str, target_language_code: str) -> str:
    """Translate one sentence into the user's target language."""
    language_name = _LANGUAGE_NAMES.get(target_language_code, target_language_code)
    response = get_chat_model().invoke(
        [
            (
                "system",
                f"Translate the given sentence into {language_name}. Return "
                "ONLY the translated sentence, nothing else.",
            ),
            ("human", sentence),
        ]
    )
    return response.content.strip()


def suggest_island_name(sentence: str) -> tuple[str, str]:
    """When a sentence doesn't match any existing island closely enough, ask
    the model for a short topic name + one-line description for a new one."""
    response = get_chat_model().invoke(
        [
            (
                "system",
                "Given a sentence from someone's spoken diary, suggest a "
                "short topic name (2-4 words) and a one-sentence description "
                "for a 'language learning island' that groups similar "
                "sentences together. Respond in exactly this format:\n"
                "Name: <name>\nDescription: <description>",
            ),
            ("human", sentence),
        ]
    )
    name, description = "New Topic", ""
    for line in response.content.strip().splitlines():
        if line.lower().startswith("name:"):
            name = line.split(":", 1)[1].strip()
        elif line.lower().startswith("description:"):
            description = line.split(":", 1)[1].strip()
    return name, description
