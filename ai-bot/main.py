# main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api import chat, coins, users, messages 
from api import coins, users, chat  # ← import your custom route files

app = FastAPI()

# Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include all routers
app.include_router(coins.router)
app.include_router(users.router)
app.include_router(chat.router)
app.include_router(messages.router)