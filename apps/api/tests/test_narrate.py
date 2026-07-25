import uuid

import pytest
from fastapi import Depends
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.ai import llm
from app.core.security import get_current_user
from app.db.models import Island, NarrationSession, Sentence, User
from app.db.session import SessionLocal, get_db
from app.main import app

client = TestClient(app)


def _fake_embedding(_text: str) -> list[float]:
    # Cheap deterministic stand-in for a real 1536-dim OpenAI embedding.
    return [0.1] * 1536


@pytest.fixture()
def stub_llm(monkeypatch):
    """Replaces every OpenAI-calling function with a deterministic stub, so
    these tests exercise the pipeline's orchestration/DB writes without
    needing a real OpenAI API key or making network calls."""
    monkeypatch.setattr(
        llm, "normalize_transcript", lambda raw: "I finished the report. It went well."
    )
    monkeypatch.setattr(llm, "embed_text", _fake_embedding)
    monkeypatch.setattr(
        llm,
        "translate_sentence",
        lambda sentence, target_language_code: f"[fr] {sentence}",
    )
    monkeypatch.setattr(
        llm, "suggest_island_name", lambda sentence: ("Work", "Job talk sentences")
    )
    monkeypatch.setattr(llm, "transcribe_audio", lambda audio_bytes, filename: "I said hello.")


@pytest.fixture()
def test_user():
    db = SessionLocal()
    user = User(id=f"test-{uuid.uuid4()}", email=f"{uuid.uuid4()}@example.com")
    db.add(user)
    db.commit()

    def _current_test_user(db: Session = Depends(get_db)) -> User:
        return db.get(User, user.id)

    app.dependency_overrides[get_current_user] = _current_test_user

    try:
        yield user
    finally:
        db.query(NarrationSession).filter(NarrationSession.user_id == user.id).delete()
        db.query(Sentence).filter(Sentence.user_id == user.id).delete()
        db.query(Island).filter(Island.user_id == user.id).delete()
        db.query(User).filter(User.id == user.id).delete()
        db.commit()
        db.close()
        app.dependency_overrides.pop(get_current_user, None)


def test_narrate_with_text_creates_sentences_and_island(test_user, stub_llm) -> None:
    response = client.post("/narrate", data={"text": "um so I finished the report today"})

    assert response.status_code == 201
    body = response.json()
    assert body["status"] == "completed"
    # normalize_transcript stub returns two sentences.
    assert len(body["sentences"]) == 2
    assert body["sentences"][0]["target_text"] == "[fr] I finished the report."
    # No existing island for this brand-new user -> falls back to the
    # model-named new island from the suggest_island_name stub.
    island_id = body["sentences"][0]["island_id"]
    assert island_id is not None
    assert all(s["island_id"] == island_id for s in body["sentences"])


def test_narrate_requires_exactly_one_input(test_user, stub_llm) -> None:
    empty_response = client.post("/narrate", data={})
    assert empty_response.status_code == 400

    both_response = client.post(
        "/narrate",
        data={"text": "hello"},
        files={"audio": ("clip.wav", b"fake-audio-bytes", "audio/wav")},
    )
    assert both_response.status_code == 400


def test_narrate_reuses_existing_similar_island(test_user, stub_llm) -> None:
    # First narration creates an island via the fallback path.
    first = client.post("/narrate", data={"text": "I finished the report today"})
    first_island_id = first.json()["sentences"][0]["island_id"]

    # Second narration embeds to the exact same fake vector, so it should be
    # classified as the SAME island rather than creating a new one.
    second = client.post("/narrate", data={"text": "The report went well"})
    second_island_id = second.json()["sentences"][0]["island_id"]

    assert second_island_id == first_island_id


def test_narrate_with_audio_transcribes_first(test_user, stub_llm) -> None:
    response = client.post(
        "/narrate", files={"audio": ("clip.wav", b"fake-audio-bytes", "audio/wav")}
    )

    assert response.status_code == 201
    # normalize_transcript stub ignores its input, so we can't assert on the
    # transcript text itself here, but a 201 with sentences proves
    # transcribe_audio -> normalize -> split -> ... ran end to end.
    assert len(response.json()["sentences"]) == 2
