from fastapi import FastAPI
from mangum import Mangum

from app.core.config import settings

app = FastAPI(title="Rephrase API")


@app.get("/health")
def health() -> dict[str, str]:
    """Simple liveness check — confirms the app is running and reading config."""
    return {"status": "ok", "environment": settings.environment}


# Mangum wraps our ASGI app so API Gateway can invoke it as a Lambda handler.
# Locally (uvicorn) this is unused; in Lambda, this `handler` is the entrypoint.
handler = Mangum(app)
