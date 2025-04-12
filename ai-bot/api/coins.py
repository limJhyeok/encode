# api/coins.py
from fastapi import APIRouter
from smolagents import tool
from .tools import fetch_single_coin, fetch_multiple_coins  # import your logic

router = APIRouter(prefix="/api/coin", tags=["Coins"])

@router.get("/{coin_address}")
async def get_coin_data(coin_address: str):
    return fetch_single_coin(coin_address)
