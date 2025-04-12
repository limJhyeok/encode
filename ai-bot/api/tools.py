import subprocess
from smolagents import tool

def run_npx_script(script_name: str, *args):
    result = subprocess.run(
        ["npx", "ts-node", script_name] + list(args),
        capture_output=True,
        text=True
    )
    return {
        "stdout": result.stdout.strip(),
        "stderr": result.stderr.strip(),
    }

@tool
def fetch_single_coin(coin_address: str) -> dict:
    """
    Fetch detailed info about a single Zora coin using its address.

    Args:
        coin_address (str): The address of the Zora coin you want to fetch.
    
    Returns:
        dict: Output logs from the script including stdout and stderr.
    """
    return run_npx_script("fetchSingleCoin.ts", coin_address)


@tool
def fetch_multiple_coins(coin_addresses: list[str]) -> dict:
    """
    Fetch info for multiple Zora coins.

    Args:
        coin_addresses (list[str]): List of Zora coin addresses.

    Returns:
        dict: Output logs.
    """
    return run_npx_script("fetchMultipleCoins.ts", *coin_addresses)

@tool
def fetch_user_profile(user_id: str) -> dict:
    """
    Fetch profile details of a Zora user.

    Args:
        user_id (str): The user's identifier (e.g. wallet or handle).

    Returns:
        dict: Output logs from the script.
    """
    return run_npx_script("fetchUserProfile.ts", user_id)

@tool
def fetch_coin_comments(coin_address: str) -> dict:
    """
    Fetch comments related to a Zora coin.

    Args:
        coin_address (str): The address of the Zora coin.

    Returns:
        dict: Output logs from the script.
    """
    return run_npx_script("fetchCoinComments.ts", coin_address)

@tool
def fetch_last_traded_coins(count: str) -> dict:
    """
    Fetch coins that were most recently traded on Zora.

    Args:
        count (str): Number of coins to retrieve.

    Returns:
        dict: Output logs from the script.
    """
    return run_npx_script("fetchLastTradedCoins.ts", count)
