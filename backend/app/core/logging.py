from logging.config import dictConfig

# Central logging config: stdout handler with a consistent formatter.
LOGGING_CONFIG = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "standard": {
            "format": "%(asctime)s %(levelname)s [%(name)s] %(message)s",
        },
    },
    "handlers": {
        "default": {
            "class": "logging.StreamHandler",
            "formatter": "standard",
            "stream": "ext://sys.stdout",
        },
    },
    "loggers": {
        "": {  # root logger
            "handlers": ["default"],
            "level": "INFO",
        },
        "uvicorn.error": {"level": "INFO"},
        "uvicorn.access": {"level": "INFO", "propagate": False},
    },
}


def setup_logging() -> None:
    """Configure logging for the app and uvicorn."""
    dictConfig(LOGGING_CONFIG)
