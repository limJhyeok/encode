from fastapi import FastAPI
from fastapi.routing import APIRoute
from starlette.middleware.cors import CORSMiddleware

# from app.api.main import api_router
import settings
from dotenv import load_dotenv
import os
from zora_agent import router

load_dotenv()
BACKEND_CORS_ORIGINS = list(os.getenv("BACKEND_CORS_ORIGINS"))
PROJECT_NAME = os.getenv("PROJECT_NAME") 

app = FastAPI()

if BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[
            str(origin).strip("/") for origin in settings.BACKEND_CORS_ORIGINS
        ],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
app.include_router(
    router
)