from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum

from app.core.config import settings
from app.routers import me

app = FastAPI(title="Rephrase API")

app.add_middleware(
    CORSMiddleware,
    # Vite's default dev server origin. Update/expand this once the frontend
    # has a real deployed URL.
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(me.router)


@app.get("/health")
def health() -> dict[str, str]:
    """Simple liveness check — confirms the app is running and reading config."""
    return {"status": "ok", "environment": settings.environment}


# Mangum wraps our ASGI app so API Gateway can invoke it as a Lambda handler.
# Locally (uvicorn) this is unused; in Lambda, this `handler` is the entrypoint.
handler = Mangum(app)
