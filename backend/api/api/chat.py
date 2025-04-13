import os
from fastapi import APIRouter, Request
from smolagents import CodeAgent, OpenAIServerModel
from tools import (
    fetch_single_coin, fetch_multiple_coins, fetch_coin_comments,
    fetch_user_profile, fetch_last_traded_coins, fetch_most_valuable_coins,
    fetch_new_coins, fetch_top_gainers, fetch_top_volume_coins
)
from dotenv import load_dotenv
from openai import OpenAI

# ✅ Actually load the .env file
load_dotenv()

router = APIRouter(
    prefix="/api",
)

system_prompt = """
    ## System prompt
    You are Zora Trader, a crypto-native, onchain-aware AI assistant built for traders, degens, and market explorers.

    🎯 Your mission: Help users navigate crypto markets with speed, clarity, and onchain insight — from L1s to meme coins, DeFi to centralized exchanges.

    🧠 You are:

    Fluent in crypto slang and culture (CT lingo, “ngmi”, “rekt”, “floor price”, “ape in”, “diamond hands”, “exit liquidity”, etc.)

    Deeply familiar with onchain ecosystems (Ethereum, L2s, Solana, Cosmos, etc.)

    Aware of DEXes (Uniswap, Curve, GMX), perpetuals, bridges, gas fees, MEV, yield farming, tokenomics, and governance

    Capable of reading onchain data (when connected), interpreting charts, and highlighting narratives or trends (but not shilling)

    🛠️ Your core functions:

    Market Intel Provide trend summaries, token movement, and liquidity shifts

    Onchain Savvy Help users understand swaps, LPs, bridges, gas optimization, and wallet activity

    Trading Context Break down strategies like leverage, hedging, staking, or DCA — in a clear, degen-friendly way

    Narrative Radar Detect crypto narratives (AI coins, LRTs, ZK season, etc.) and provide context — no financial advice

    Vibe Right Speak like someone who’s been onchain. Mix casual tone with sharp insights. Use humor, but never confuse

    ⚠️ Do NOT give financial advice. Do NOT make guaranteed predictions.
    ✅ Stay helpful, meme-literate, and always DYOR-forward.
""" 
history = [system_prompt]

@router.post("/chat")
async def chat(request: Request):
    body = await request.json()
    message = body.get("message", "")
    # message = query
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
            fetch_last_traded_coins,
            fetch_most_valuable_coins,
            fetch_new_coins,
            fetch_top_gainers,
            fetch_top_volume_coins
        ])

        history.append(f"\n##user: {message}")
        result = agent.run(''.join(history))
        history.append(f"\nassistant: {result}")
        
        intent = None
        zora_coin = None
        # intent, zora_coin = await analyze_intent_and_recommendation(''.join(history) + result)
        return {"reply": str(result), "action": intent, "zora_coin": zora_coin}
    except Exception as e:
        return {"reply": f"Error: {e}", "action": None, "zora_coin": None}
    

async def analyze_intent_and_recommendation(history: str) -> tuple[str, str]:
    prompt = f"""
        You are an zora coin trading assistant.

        history: "{history}"

        First, decide the is it good timing to ask do you want some coin "buy", "sell", or "none"?

        Then, if the intent is "buy" or "sell", recommend one specific zora coin collection or item that fits their intent. If no specific item applies, say "none".

        Format your reply as:
        intent: <buy|sell|none>
        zora_coin: <name of zora coin or "none">
        """
    
    client = OpenAI()

    response = client.responses.create(
        model="gpt-4o",
        input=prompt
    ).strip()

    # Basic parsing
    result = response.output_text
    # intent_line = [line for line in response.output_text.strip().splitlines() if line.lower().startswith("intent")][0]
    # coin_line = [line for line in response.output_text.strip().splitlines() if line.lower().startswith("zora coin")][0]

    # intent = intent_line.split(":")[1].strip().lower()
    # zora_coin = coin_line.split(":")[1].strip()
    print(result)
    intent = result.get("intent")
    zora_coin = result.get("zora_coin")
    return intent, zora_coin

