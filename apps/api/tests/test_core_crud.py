import uuid

import pytest
from fastapi import Depends
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.core.security import get_current_user
from app.db.models import Island, Review, Sentence, User
from app.db.session import SessionLocal, get_db
from app.main import app

client = TestClient(app)


@pytest.fixture()
def test_user_and_data():
    """Creates a throwaway user + one island + one sentence directly in the
    DB (bypassing Cognito/auth entirely), overrides `get_current_user` so
    every request in the test is authenticated as this user, then cleans
    everything up afterwards."""
    db = SessionLocal()
    user = User(id=f"test-{uuid.uuid4()}", email=f"{uuid.uuid4()}@example.com")
    db.add(user)
    db.commit()

    island = Island(user_id=user.id, name="Work", description="Job talk")
    db.add(island)
    db.commit()

    sentence = Sentence(
        user_id=user.id,
        island_id=island.id,
        source_text="I finished the report.",
        target_text="J'ai fini le rapport.",
        embedding=[0.0] * 1536,
    )
    db.add(sentence)
    db.commit()
    db.refresh(user)
    db.refresh(island)
    db.refresh(sentence)

    # Route handlers request `Depends(get_db)` themselves too; wiring this
    # override through the same dependency (rather than a bare lambda) means
    # FastAPI's per-request dependency caching gives both the SAME session —
    # exactly like production, where get_current_user's session is shared
    # with the route's own `db` param. Without this, the user object would
    # belong to a different session than the route uses, breaking things
    # like `db.refresh(user)`.
    def _current_test_user(db: Session = Depends(get_db)) -> User:
        return db.get(User, user.id)

    app.dependency_overrides[get_current_user] = _current_test_user

    try:
        yield {"user": user, "island": island, "sentence": sentence}
    finally:
        db.query(Review).filter(Review.user_id == user.id).delete()
        db.query(Sentence).filter(Sentence.user_id == user.id).delete()
        db.query(Island).filter(Island.user_id == user.id).delete()
        db.query(User).filter(User.id == user.id).delete()
        db.commit()
        db.close()
        app.dependency_overrides.pop(get_current_user, None)


def test_get_me(test_user_and_data) -> None:
    user = test_user_and_data["user"]

    response = client.get("/me")

    assert response.status_code == 200
    body = response.json()
    assert body["id"] == user.id
    assert body["email"] == user.email
    assert body["target_language"] == "fr-FR"


def test_patch_me_updates_only_sent_fields(test_user_and_data) -> None:
    response = client.patch("/me", json={"display_name": "Alex"})

    assert response.status_code == 200
    body = response.json()
    assert body["display_name"] == "Alex"
    assert body["target_language"] == "fr-FR"


def test_list_islands_includes_sentence_count(test_user_and_data) -> None:
    response = client.get("/islands")

    assert response.status_code == 200
    islands = response.json()
    assert len(islands) == 1
    assert islands[0]["name"] == "Work"
    assert islands[0]["sentence_count"] == 1


def test_get_island_by_id(test_user_and_data) -> None:
    island = test_user_and_data["island"]

    response = client.get(f"/islands/{island.id}")

    assert response.status_code == 200
    assert response.json()["id"] == str(island.id)


def test_get_island_not_found_for_unknown_id(test_user_and_data) -> None:
    response = client.get(f"/islands/{uuid.uuid4()}")

    assert response.status_code == 404


def test_list_sentences_filtered_by_island(test_user_and_data) -> None:
    island = test_user_and_data["island"]

    response = client.get("/sentences", params={"island_id": str(island.id)})

    assert response.status_code == 200
    sentences = response.json()
    assert len(sentences) == 1
    assert sentences[0]["target_text"] == "J'ai fini le rapport."


def test_create_review_and_stats_reflect_it(test_user_and_data) -> None:
    sentence = test_user_and_data["sentence"]

    review_response = client.post(
        "/reviews", json={"sentence_id": str(sentence.id), "attempt_text": "J'ai fini le rapport."}
    )
    assert review_response.status_code == 201
    review_body = review_response.json()
    # Unjudged until the Phase 3 agent exists.
    assert review_body["correctness"] is None

    stats_response = client.get("/stats")
    assert stats_response.status_code == 200
    stats = stats_response.json()
    assert stats["island_count"] == 1
    assert stats["sentence_count"] == 1
    assert stats["review_count"] == 1
    # No judged reviews yet, so accuracy is undefined.
    assert stats["recall_accuracy"] is None


def test_create_review_404_for_someone_elses_sentence(test_user_and_data) -> None:
    response = client.post(
        "/reviews", json={"sentence_id": str(uuid.uuid4()), "attempt_text": "anything"}
    )

    assert response.status_code == 404
