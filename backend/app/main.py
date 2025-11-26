import logging

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.api.routes import auth, events
from app.core.config import settings
from app.core.logging import setup_logging


setup_logging()
app = FastAPI(title="Countdown Calendar API")
logger = logging.getLogger(__name__)

# CORS for frontend integration; adjust origins via settings.
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Health check to verify the app is running.
@app.get("/health")
async def health() -> dict[str, str]:
    return {"status": "ok"}


@app.exception_handler(Exception)
async def generic_exception_handler(request: Request, exc: Exception):
    logger.exception("Unhandled exception: %s %s", request.method, request.url)
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error"},
    )


# Include routers
app.include_router(
    auth.router,
    prefix="/auth",
    tags=["auth"],
)
app.include_router(
    events.router,
    prefix="/events",
    tags=["events"],
)
