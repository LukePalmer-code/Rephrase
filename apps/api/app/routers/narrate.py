from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile, status
from sqlalchemy.orm import Session

from app.ai import llm
from app.ai.narrate_graph import process_narration
from app.core.security import get_current_user
from app.db.models import NarrationSession, NarrationStatus, User
from app.db.session import get_db
from app.schemas.narrate import NarrateResponse

router = APIRouter(tags=["narrate"])


@router.post("/narrate", response_model=NarrateResponse, status_code=status.HTTP_201_CREATED)
async def narrate(
    text: str | None = Form(default=None),
    audio: UploadFile | None = File(default=None),
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
) -> NarrateResponse:
    """Submit a narrated moment (as typed text OR an audio recording — not
    both) and run it through the fixed Narrate pipeline: transcribe (if
    audio) -> normalize -> split -> classify_island -> translate ->
    embed_and_store."""
    if not text and audio is None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Provide either 'text' or 'audio'"
        )
    if text and audio is not None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Provide only one of 'text' or 'audio'"
        )

    if audio is not None:
        audio_bytes = await audio.read()
        raw_transcript = llm.transcribe_audio(audio_bytes, audio.filename or "audio.wav")
    else:
        raw_transcript = text

    try:
        sentences = process_narration(db, user, raw_transcript)
    except Exception as exc:
        db.rollback()
        failed_session = NarrationSession(
            user_id=user.id, raw_transcript=raw_transcript, status=NarrationStatus.FAILED
        )
        db.add(failed_session)
        db.commit()
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY, detail="Narrate pipeline failed"
        ) from exc

    session = NarrationSession(
        user_id=user.id, raw_transcript=raw_transcript, status=NarrationStatus.COMPLETED
    )
    db.add(session)
    db.commit()

    return NarrateResponse(session_id=session.id, status=session.status, sentences=sentences)
