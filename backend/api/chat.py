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
from openai import OpenAI
import json
# ✅ Actually load the .env file
load_dotenv()

router = APIRouter(prefix="/api")

system_prompt = """
    ### System Prompt
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

    Also, you can solves tasks by generating Python code.

    Follow this exact format in your response:
    Thoughts: Describe your reasoning briefly.
    Code:
    ```py
    # Python code solving the task
    <end code>
    ```
    Do not include any text after <end_code>. Only include one code block per response.
""" 
history = [system_prompt]

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
            api_key=os.environ["OPENAI_API_KEY"],
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
        ],
        max_steps = 20
        )
        history.append(f"\n### user: {message}")
        result = agent.run("".join(history))
        history.append(f"\n### assistant: {str(result)}")

        intent, zora_coin = analyze_intent_and_recommendation(message + str(result))
        print(f"intent: {intent}, zora_coin: {zora_coin}")
        return {"reply": str(result), "intent": intent, "zora_coin": zora_coin}
    except Exception as e:
        return {"reply": f"Error: {e}", "intent": None, "zora_coin": None}


def analyze_intent_and_recommendation(history: str) -> tuple[str, str]:
    prompt = """
        You are an zora trading assistant.

        User message: "{history}"

        First, decide the user's intent. Is it "buy", "sell", or "none"?

        Then, if the intent is "buy" or "sell", recommend one specific zora coin collection or item that fits their intent. If no specific item applies, say "none".
        Given the following user input, identify the intent and zora_coin. 
        Respond in JSON format like {"intent": (buy|sell|none), "zora_coin": (name of zora_coin or "none")}
        """
    client = OpenAI()

    response = client.responses.create(
        model="gpt-4o",
        input= prompt + history,
    )
    intent = None
    zora_coin = None

    output = response.output_text

    if isinstance(output, str):
        try:
            parsed = json.loads(output)
            intent = parsed.get('intent')
            zora_coin = parsed.get('zora_coin')
        except json.JSONDecodeError as e:
            print("Failed to parse JSON:", e)
            print("Raw output:", repr(output))
    elif isinstance(output, dict):
        intent = output.get('intent')
        zora_coin = output.get('zora_coin')
    else:
        print("Unexpected output type:", type(output))
        print("Raw output:", output)


    return intent, zora_coin