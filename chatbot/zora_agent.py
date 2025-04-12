import os
from smolagents import OpenAIServerModel, CodeAgent, DuckDuckGoSearchTool
from fastapi import APIRouter
from zora_tools import (
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

router = APIRouter(
    prefix="/api/ai",
)

@router.get("/chat")
def get_chat(query: str):
    model = OpenAIServerModel(
        model_id="gpt-4o",
        api_base="https://api.openai.com/v1",
        api_key=os.environ["OPENAI_API_KEY"],
    )

    search_tool = DuckDuckGoSearchTool()
    zora_tools = [
        fetch_single_coin,
        fetch_multiple_coins,
        fetch_coin_comments,
        fetch_user_profile,
        fetch_top_gainers,
        fetch_top_volume_coins,
        fetch_most_valuable_coins,
        fetch_new_coins,
        fetch_last_traded_coins
    ]

    agent = CodeAgent(
        model=model,
        tools=[search_tool] + zora_tools,
    )
    system_prompt = """
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
    # using system prompt, to be like style consistency 
    query = system_prompt + query

    try:
        result = agent.run(query)
        return {"result": result}
    except Exception as e:
        return {"exception": e}
    