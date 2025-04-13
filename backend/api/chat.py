import os
from fastapi import APIRouter, Request
from smolagents import CodeAgent, OpenAIServerModel
from tools import (
    fetch_single_coin,
    fetch_multiple_coins,
    fetch_coin_comments,
    fetch_user_profile,
    fetch_top_gainers,
    fetch_top_volume_coins,
    fetch_most_valuable_coins,
    fetch_new_coins,
    fetch_last_traded_coins   
)
from dotenv import load_dotenv

# ✅ Actually load the .env file
load_dotenv()

router = APIRouter(prefix="/api")

@router.post("/chat")
async def chat(request: Request):
    body = await request.json()
    message = body.get("message", "")

    if not message:
        return {"reply": "No message provided."}

    try:
        model = OpenAIServerModel(
            model_id="gpt-4o",
            api_base="https://api.openai.com/v1",
            api_key=os.environ["OPENAI_API_KEY"]
        )

        agent = CodeAgent(model=model, tools=[
            fetch_single_coin,
            fetch_multiple_coins,
            fetch_coin_comments,
            fetch_user_profile,
            fetch_top_gainers,
            fetch_top_volume_coins,
            fetch_most_valuable_coins,
            fetch_new_coins,
            fetch_last_traded_coins
        ])

        result = agent.run(message)
        return {"reply": str(result)}
    except Exception as e:
        return {"reply": f"Error: {e}"}
