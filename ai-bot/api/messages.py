from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict
from datetime import datetime

router = APIRouter()

# In-memory store of messages (user_id -> list of messages)
# Format: { "user1": [{sender: ..., receiver: ..., message: ...}], ... }
messages_store: Dict[str, List[Dict]] = {}

class Message(BaseModel):
    sender: str
    receiver: str
    message: str

class ChatMessage(Message):
    timestamp: str

@router.post("/api/message")
def send_message(msg: Message):
    """Send a message from one user to another."""

    chat = ChatMessage(**msg.dict(), timestamp=datetime.utcnow().isoformat())

    for uid in [msg.sender, msg.receiver]:
        if uid not in messages_store:
            messages_store[uid] = []
        messages_store[uid].append(chat.dict())

    return {"status": "✅ Message sent", "data": chat}


@router.get("/api/message/{user_id}")
def get_chat_previews(user_id: str):
    """Get a preview list of all chats for this user."""

    if user_id not in messages_store:
        return {"chats": []}

    previews = {}
    for msg in messages_store[user_id]:
        other_user = msg["receiver"] if msg["sender"] == user_id else msg["sender"]
        if other_user not in previews:
            previews[other_user] = msg  # first msg is latest for now

    return {"chats": list(previews.values())}


@router.get("/api/message/{user_id}/{receiver_id}")
def get_full_chat(user_id: str, receiver_id: str):
    """Get full chat history between user_id and receiver_id."""

    if user_id not in messages_store:
        raise HTTPException(status_code=404, detail="No messages found.")

    conversation = [
        msg for msg in messages_store[user_id]
        if (msg["sender"] == receiver_id or msg["receiver"] == receiver_id)
    ]

    return {"messages": sorted(conversation, key=lambda x: x["timestamp"])}
