# api/users.py
from fastapi import APIRouter
from .tools import fetch_user_profile, fetch_single_coin  # Your existing logic

router = APIRouter(prefix="/api/user", tags=["Users"])

@router.get("/{user_id}")
async def get_user_data(user_id: str):
    return fetch_user_profile(user_id)
