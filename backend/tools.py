import subprocess
import requests
from datetime import datetime
from smolagents import tool


def run_npx_script(script_name: str, *args):
    result = subprocess.run(
        ["npx", "ts-node", script_name] + list(args),
        capture_output=True,
        text=True
    )
    stdout = result.stdout.strip()
    stderr = result.stderr.strip()

    std_result = {"stderr": stderr,
              "stdout": stdout}
    if result.returncode == 0:
        if stderr:
            print("⚠️ STDERR output even though returncode == 0:")
            print(stderr)
        print("✅ STDOUT (normal log):")
        print(stdout)
    else:
        print("❌ Subprocess failed.")
        print("STDERR:", stderr)
        print("STDOUT:", stdout)
    return std_result

@tool
def fetch_single_coin(coin_address: str) -> dict:
    """
    Logs various details about a Zora coin to the console.

    This function logs the following coin attributes, each with a fallback value of "N/A" if the attribute is not present:
    - Coin Address
    - Coin Name
    - Coin Symbol
    - Coin Description
    - Total Supply
    - Market Cap
    - 24h Volume
    - Creator Address
    - Creation Date
    - Unique Holders

    Additionally, if the coin contains media content, a preview image URL will be logged. If no preview image is available, a message indicating that no preview image is available will be logged.
    You can view the Zora webpage for this token at: https://zora.co/coin/base:{Coin Address}
    If any attribute is missing, the corresponding line will show "N/A".

    Args:
        coin_address (str): The unique identifier of the Zora coin (e.g., the coin's address).

    Example:
        ✅ STDOUT (normal log):
        Coin Details:
        - Coin Address: 0xd2a01d7e30726d0f457588fee8f784507914a927
        - Name: OG GRAMPA
        - Symbol: OG GRAMPA
        - Description: The OG JD Grampa now on Base
        - Total Supply: 1000000000
        - Market Cap: 4939.28
        - 24h Volume: 2121.98
        - Creator: 0x58c5bcba9f880b4b53a35dcd42626b0e566dd73c
        - Created At: 2025-04-11T22:17:21
        - Unique Holders: 30
        - Preview Image: {
        small: 'https://media.decentralized-content.com/-/rs:fit:600:600/f:best/aHR0cHM6Ly9tYWdpYy5kZWNlbnRyYWxpemVkLWNvbnRlbnQuY29tL2lwZnMvYmFmeWJlaWUzb2lyd29xZ29kYjNqbHgydHh1ZHIyYWZ2ZGxiYml4bWIzejZoNWgzNHl6Y3Vna3lhaDQ=',
        medium: 'https://media.decentralized-content.com/-/rs:fit:1200:1200/f:best/aHR0cHM6Ly9tYWdpYy5kZWNlbnRyYWxpemVkLWNvbnRlbnQuY29tL2lwZnMvYmFmeWJlaWUzb2lyd29xZ29kYjNqbHgydHh1ZHIyYWZ2ZGxiYml4bWIzejZoNWgzNHl6Y3Vna3lhaDQ=',
        blurhash: 'eHDlKH$*0y9Z-U=xIoJ.S$xF9uX9-UoeRjOsWX#kV@xuSzNG$*t7f+'
        }
        ✅ Coin fetched successfully
    """

    return run_npx_script("zora_api/fetchSingleCoin.ts", coin_address)

@tool
def fetch_multiple_coins(coin_addresses: list[str]) -> dict:
    """
    Fetches multiple Zora coins' data from an API based on provided coin addresses.
    
    This function logs the following details for each coin:
    - Coin Address
    - Coin Name
    - Coin Symbol
    - Coin Description
    - Total Supply
    - Market Cap
    - 24h Volume
    - Creator Address
    - Creation Date
    - Unique Holders
    - Preview Image (if available)
    
    The function checks if the response contains valid data and logs detailed information.
    If an error occurs during the fetch, it will log the error message.
    You can view the Zora webpage for this token at: https://zora.co/coin/base:{Coin Address}
    If any attribute is missing, the corresponding line will show "N/A".

    Args:
        coin_addresses (List[str]): A list of Zora coin addresses to fetch data for.

    Example:
        ✅ STDOUT (normal log):
        Coin Details:
        Coin Address: 0xd2a01d7e30726d0f457588fee8f784507914a927
        - Name: OG GRAMPA
        - Symbol: OG GRAMPA
        - Description: The OG JD Grampa now on Base
        - Total Supply: 1000000000
        - Market Cap: 4943.78
        - 24h Volume: 2122.07
        - Creator: 0x58c5bcba9f880b4b53a35dcd42626b0e566dd73c
        - Created At: 2025-04-11T22:17:21
        - Unique Holders: 32
        - Preview Image: {
        small: 'https://media.decentralized-content.com/-/rs:fit:600:600/f:best/aHR0cHM6Ly9tYWdpYy5kZWNlbnRyYWxpemVkLWNvbnRlbnQuY29tL2lwZnMvYmFmeWJlaWUzb2lyd29xZ29kYjNqbHgydHh1ZHIyYWZ2ZGxiYml4bWIzejZoNWgzNHl6Y3Vna3lhaDQ=',
        medium: 'https://media.decentralized-content.com/-/rs:fit:1200:1200/f:best/aHR0cHM6Ly9tYWdpYy5kZWNlbnRyYWxpemVkLWNvbnRlbnQuY29tL2lwZnMvYmFmeWJlaWUzb2lyd29xZ29kYjNqbHgydHh1ZHIyYWZ2ZGxiYml4bWIzejZoNWgzNHl6Y3Vna3lhaDQ=',
        blurhash: 'eHDlKH$*0y9Z-U=xIoJ.S$xF9uX9-UoeRjOsWX#kV@xuSzNG$*t7f+'
        }
        -----------------------------------
        Coin Details:
        Coin Address: 0x0acd5006a4ee321be73bbe7a033cec236c9a62db
        ...(omit)...
        -----------------------------------
    """
    return run_npx_script("zora_api/fetchMultipleCoins.ts", *coin_addresses)

@tool
def fetch_coin_comments(coin_address: str) -> dict:
    """
    Fetches and logs comments for a given Zora coin address from an API.

    This function logs the following details for each comment:
    - Author (either the user's handle or address)
    - Comment text
    - Creation date
    - Replies (if available)

    It also handles pagination and logs the cursor for the next page of comments if it exists.
    You can view the Zora webpage for this token at: https://zora.co/coin/base:{Coin Address}
    If any attribute is missing, the corresponding line will show "N/A".
    
    Args:
        coin_address (str): The unique identifier of the Zora coin (e.g., the coin's address).

    Example:
        ✅ STDOUT (normal log):
        Found 20 comments
        Comment 1:
        - Author: defiland
        - Text: OG
        - Created At: 1744404299
        - Reply: undefined
        -----------------------------------
        Comment 2:
        - Author: splendid66
        - Text: Face.app ? :)}]
        - Created At: 1744400927
        ...(omit)...

    """
    return run_npx_script("zora_api/fetchCoinComments.ts", coin_address)

@tool
def fetch_user_profile(user_id: str) -> dict:
    """
    Fetches and logs the user profile for a given identifier from an API.

    This function retrieves and logs the following details from the user profile:
    - Handle: The user's unique identifier
    - Display Name: The name displayed for the user
    - Bio: A brief description of the user
    - Profile Image: The user's avatar (if available)
    - Linked Wallets: The user's linked wallets with their types and addresses (if available)

    It also handles errors by logging appropriate messages and returning error details if any issues occur during the fetch process.

    Args:
        user_id (str): The unique identifier for the user whose profile is being fetched.
    
    Example:
        ✅ STDOUT (normal log):
        Profile Details:
        - Handle: 711truther
        - Display Name: 711truther
        - Bio: Just a Boy 
        - Profile Image: https://media.decentralized-content.com/-/rs:fit:1200:1200/f:best/aHR0cHM6Ly9tYWdpYy5kZWNlbnRyYWxpemVkLWNvbnRlbnQuY29tL2lwZnMvYmFmeWJlaWJ6ZXFlNmZta3VzbjJmZ2VwbDV3Ynd6Y2k1NXdkeW9jbTdvN2N5ejMzNW5naDNiM2NiZXU=
        Linked Wallets:
        - PRIVY: 0xf24b769c6cda2bb656cb3ef02fc1231e085f065f
        - SMART_WALLET: 0x58c5bcba9f880b4b53a35dcd42626b0e566dd73c
        ✅ user profile fetched successfully
    """

    return run_npx_script("zora_api/fetchUserProfile.ts", user_id)

@tool
def fetch_top_gainers(count: str) -> dict:
    """
    Fetches and logs the top gainers (coins with the highest market cap increase) from an API.

    This function retrieves and logs the following details for each coin:
    - Name: The name of the coin
    - Symbol: The symbol of the coin
    - 24h Change: The percentage change in market cap over the last 24 hours
    - Market Cap: The market capitalization of the coin
    - Volume 24h: The trading volume in the last 24 hours
    - Total Supply: The total supply of the coin
    - Description: A brief description of the coin
    - Coin Address: The unique address of the coin
    - Creator: The creator's address of the coin
    - Created At: The timestamp when the coin was created
    - Unique Holders: The number of unique holders of the coin

    It also handles pagination by logging the cursor for the next page of results if available.
    You can view the Zora webpage for this token at: https://zora.co/coin/base:{Coin Address}
    If any attribute is missing, the corresponding line will show "N/A".

    Args:
        count (int): The number of top gainers (Zora coins) to fetch.

    Example:
        ✅ STDOUT (normal log):
        Top Gainers (10 coins):
        1. horse (horse)
        24h Change: 19551.18%
        Market Cap: 236277.87
        Volume 24h: 6990.45
        - Name: horse
        - Symbol: horse
        - Description: 
        - Total Supply: 1000000000
        - Market Cap: 236277.87
        - 24h Volume: 6990.45
        - coin address: 0xf1fc9580784335b2613c1392a530c1aa2a69ba3d
        - Creator: 0x3a5df03dd1a001d7055284c2c2c147cbbc78d142
        - Created At: 2025-03-12T16:09:53
        - Unique Holders: 21600
        -----------------------------------
        2. Road to 0 (Road to 0)
        24h Change: 8276.58%
        Market Cap: 8276.58
        Volume 24h: 23741.03
        ...(omit)...
    """

    # return run_npx_script("zora_api/fetchTopGainers.ts", count)
    return """
✅ STDOUT (normal log):
Top Gainers (5 coins):
1. horse (horse)
   24h Change: 90847.16%
   Market Cap: 387007.38
   Volume 24h: 23955.26
- Name: horse
- Symbol: horse
- Description: 
- Total Supply: 1000000000
- Market Cap: 387007.38
- 24h Volume: 23955.26
- coin address: 0xf1fc9580784335b2613c1392a530c1aa2a69ba3d
- Creator: 0x3a5df03dd1a001d7055284c2c2c147cbbc78d142
- Created At: 2025-03-12T16:09:53
- Unique Holders: 21942
-----------------------------------
2. OG BABYFACE (OG BABYFACE)
   24h Change: 56177.36%
   Market Cap: 90340.73
   Volume 24h: 13237.71
- Name: OG BABYFACE
- Symbol: OG BABYFACE
- Description: The original JD Vance BabyFace Edit 
- Total Supply: 1000000000
- Market Cap: 90340.73
- 24h Volume: 13237.71
- coin address: 0x0acd5006a4ee321be73bbe7a033cec236c9a62db
- Creator: 0x58c5bcba9f880b4b53a35dcd42626b0e566dd73c
- Created At: 2025-04-10T16:27:49
- Unique Holders: 2141
-----------------------------------
3. JUST KEEP CLICKING (JUST KEEP CLICKING)
   24h Change: 14478.38%
   Market Cap: 52677.93
   Volume 24h: 2676.58
- Name: JUST KEEP CLICKING
- Symbol: JUST KEEP CLICKING
- Description: Disclosure: This is an experiment testing something in particular. Follow the journey at your own risk. NFA.
- Total Supply: 1000000000
- Market Cap: 52677.93
- 24h Volume: 2676.58
- coin address: 0x78f11d82f93cf707d98e00870c9debf3601fa397
- Creator: 0xc2b094887b8a6d45458004350bc428f4cb5104b1
- Created At: 2025-02-26T22:00:01
- Unique Holders: 4486
-----------------------------------
4. amps.fun (amps.fun)
   24h Change: 11922.63%
   Market Cap: 104573.37
   Volume 24h: 4829.37
- Name: amps.fun
- Symbol: amps.fun
- Description: get paid when friends post
- Total Supply: 1000000000
- Market Cap: 104573.37
- 24h Volume: 4829.37
- coin address: 0x1b23819885fce964a8b39d364b7462d6e597ae8e
- Creator: 0xc108e4324b7ec39f7758bd1827953353fc883f88
- Created At: 2025-02-21T20:48:29
- Unique Holders: 22311
-----------------------------------
5. cow cat (cow cat)
   24h Change: 8520.82%
   Market Cap: 8520.82
   Volume 24h: 23550.66
- Name: cow cat
- Symbol: cow cat
- Description: 
- Total Supply: 1000000000
- Market Cap: 8520.82
- 24h Volume: 23550.66
- coin address: 0x0be3ae10ba559eadad46f286ccefa2cffbb5fe0a
- Creator: 0xabc0463b2bd903f291ca08845a16c971ed10be6b
- Created At: 2025-04-13T03:18:19
- Unique Holders: 143
-----------------------------------
Next page cursor: eyJtYXJrZXRfY2FwX2RlbHRhXzI0aCI6IDg1MjAuODE3MDk4NTM5OTAxLCAiX2lkIjogeyIkb2lkIjogIjY3ZmIyY2ZjMjAwMjgxZWM0YzQyNWRhMSJ9fQ==
✅ Coin(s) with the highest market cap increase in the last 24 hours. fetched successfully
"""

@tool
def fetch_top_volume_coins(count: str) -> dict:
    """
    Fetches and logs the Zora coins with the highest trading volume in the last 24 hours from an API.

    This function retrieves and logs the following details for each coin:
    - Name: The name of the coin
    - Symbol: The symbol of the coin
    - 24h Volume: The trading volume in the last 24 hours
    - Coin Address: The unique address of the coin
    - Market Cap: The market capitalization of the coin
    - Holders: The number of unique holders of the coin

    It also handles pagination by logging the cursor for the next page of results if available.
    You can view the Zora webpage for this token at: https://zora.co/coin/base:{Coin Address}
    If any attribute is missing, the corresponding line will show "N/A".

    Args:
        count (int): The number of top volume Zora coins to fetch.

    Example:
        ✅ STDOUT (normal log):
        Top Volume Coins (10 coins):
        1. OG BABYFACE (OG BABYFACE)
        Volume 24h: 24106.08
        Coin Address: 0x0acd5006a4ee321be73bbe7a033cec236c9a62db
        Market Cap: 38767.49
        Holders: 1577
        -----------------------------------
        2. Road to 0 (Road to 0)
        Volume 24h: 23741.03
        ...(omit)...
    """

    # return run_npx_script("zora_api/fetchTopVolumeCoins.ts", count)
    return """
✅ STDOUT (normal log):
Top Volume Coins (5 coins):
1. horse (horse)
   Volume 24h: 23991.4
   Coin Address: 0xf1fc9580784335b2613c1392a530c1aa2a69ba3d
   Market Cap: 386186.57
   Holders: 21947
-----------------------------------
2. cow cat (cow cat)
   Volume 24h: 23594.0
   Coin Address: 0x0be3ae10ba559eadad46f286ccefa2cffbb5fe0a
   Market Cap: 8503.02
   Holders: 145
-----------------------------------
3. OG BABYFACE (OG BABYFACE)
   Volume 24h: 13240.32
   Coin Address: 0x0acd5006a4ee321be73bbe7a033cec236c9a62db
   Market Cap: 90152.70
   Holders: 2144
-----------------------------------
4. amps.fun (amps.fun)
   Volume 24h: 4788.78
   Coin Address: 0x1b23819885fce964a8b39d364b7462d6e597ae8e
   Market Cap: 104463.68
   Holders: 22315
-----------------------------------
5. Mysterious Megapeak (Mysterious Megapeak)
   Volume 24h: 4769.53
   Coin Address: 0x645f167b8ed4235e7d132407341594061e62ae26
   Market Cap: 2716.42
   Holders: 244
-----------------------------------
Next page cursor: eyJ2b2x1bWVfMjRoIjogNDc2OS41MywgIl9pZCI6IHsiJG9pZCI6ICI2N2ZhODJkZDUyNWI5NDRhY2MyY2E3NzcifX0=
✅ Coin(s) with the highest trading volume in the last 24 hours.. fetched successfully
"""

@tool
def fetch_most_valuable_coins(count: str) -> dict:
    """
    Fetches and logs the most valuable Zora coins (highest market capitalization) from an API.

    This function retrieves and logs the following details for each coin:
    - Name: The name of the coin
    - Symbol: The symbol of the coin
    - Market Cap: The market capitalization of the coin
    - 24h Volume: The trading volume in the last 24 hours
    - Created At: The timestamp when the coin was created

    It also handles pagination by logging the cursor for the next page of results if available.

    Args:
        count (int): The number of most valuable Zora coins to fetch.

    Example:
        ✅ STDOUT (normal log):
        Most Valuable Coins (10 coins):
        1. horse (horse)
        Coin Address: 0xf1fc9580784335b2613c1392a530c1aa2a69ba3d
        Market Cap: 232280.97
        Volume 24h: 7196.7
        Created: 2025-03-12T16:09:53
        -----------------------------------
        2. amps.fun (amps.fun)
        Coin Address: 0x1b23819885fce964a8b39d364b7462d6e597ae8e
        ...(omit)...
    """

    # return run_npx_script("zora_api/fetchMostValuableCoins.ts", count)
    return """
✅ STDOUT (normal log):
Most Valuable Coins (5 coins):
1. horse (horse)
   Coin Address: 0xf1fc9580784335b2613c1392a530c1aa2a69ba3d
   Market Cap: 386832.05
   Volume 24h: 24004.94
   Created: 2025-03-12T16:09:53
-----------------------------------
2. amps.fun (amps.fun)
   Coin Address: 0x1b23819885fce964a8b39d364b7462d6e597ae8e
   Market Cap: 104358.91
   Volume 24h: 4562.48
   Created: 2025-02-21T20:48:29
-----------------------------------
3. OG BABYFACE (OG BABYFACE)
   Coin Address: 0x0acd5006a4ee321be73bbe7a033cec236c9a62db
   Market Cap: 89603.47
   Volume 24h: 13265.75
   Created: 2025-04-10T16:27:49
-----------------------------------
4. CREATE (CREATE)
   Coin Address: 0x8a9cf9ae6536127129727938cb1a6438273e4f94
   Market Cap: 89533.00
   Volume 24h: 1292.65
   Created: 2025-03-05T03:09:21
-----------------------------------
5. JUST KEEP CLICKING (JUST KEEP CLICKING)
   Coin Address: 0x78f11d82f93cf707d98e00870c9debf3601fa397
   Market Cap: 52557.88
   Volume 24h: 2682.87
   Created: 2025-02-26T22:00:01
-----------------------------------
Next page cursor: eyJjb2luX3ByaWNlX3VzZGMiOiA1LjI1NTc4Nzk1MzllLTA1LCAiX2lkIjogeyIkb2lkIjogIjY3YzFlOTFmYTQyMjdmMTA0YmRlYzQ3YSJ9fQ==
✅ Coin(s) with the highest market.. fetched successfully
"""

@tool
def fetch_new_coins(count: str) -> dict:
    """
    Fetches and logs the most recently created Zora coins from an API.

    This function retrieves and logs the following details for each coin:
    - Name: The name of the coin
    - Symbol: The symbol of the coin
    - Created At: The timestamp when the coin was created (formatted for readability)
    - Creator: The creator's address of the coin
    - Market Cap: The market capitalization of the coin

    It also handles pagination by logging the cursor for the next page of results if available.

    Args:
        count (int): The number of new Zora coins to fetch.

    Example:
        ✅ STDOUT (normal log):
        New Coins (10 coins):
        1. 😁 (😁)
        Coin Address: 0x4f126706a36cbef177e6f68327f6906072e44845
        Created: 12/04/2025, 03:11:25
        Creator: 0x6e0dfd287618d09215bae20b44452e1413ce6fc6
        Market Cap: 21.55
        -----------------------------------
        2. 34 (34)
        Coin Address: 0x11ce08f4a57aa0a01d04f32f4e61b835333fb641
        Created: 12/04/2025, 03:10:37
        ...(omit)...
    """


    # return run_npx_script("zora_api/fetchNewCoins.ts", count)
    return """
✅ STDOUT (normal log):
New Coins (5 coins):
1. Profound value-added open (Profound value-added open)
   Coin Address: 0x5b01b106a960ddbec523eb8b904be25deac93e37
   Created: 13/04/2025, 08:01:27
   Creator: 0x8ed2ecfb87ac8cb23b684f6ef2b7efe57c228895
   Market Cap: 22.44
-----------------------------------
2. Danzi needs your love  (Danzi needs your love )
   Coin Address: 0x45e347ccba0cfd4de93ede95f90c2b39da413c82
   Created: 13/04/2025, 08:01:01
   Creator: 0x1b3c7d071fbd4d24c8bcc496ad2f0d760c796bba
   Market Cap: 22.44
-----------------------------------
3. Hello Sunshine (Hello Sunshine)
   Coin Address: 0x741a0db3831b83f060dd8223d4f8c24dd5c986e3
   Created: 13/04/2025, 08:00:37
   Creator: 0x60b581be0902707a338090c28c53caa8cf9a909b
   Market Cap: 30.64
-----------------------------------
4. Automated asymmetric intranet (Automated asymmetric intranet)
   Coin Address: 0xd8d08163328393e602afda1f8d2b4f9d76abcf03
   Created: 13/04/2025, 08:00:01
   Creator: 0x599119452fdcf233eb00850e1f2eaeee745f9dc5
   Market Cap: 22.44
-----------------------------------
5. Reactive analyzing service-desk (Reactive analyzing service-desk)
   Coin Address: 0x8e88a3f165f5db79e89ae4a0347e2aad64abb3d5
   Created: 13/04/2025, 07:59:59
   Creator: 0x3a426e348af05077f0c2c802155ce35c05777146
   Market Cap: 22.44
-----------------------------------
Next page cursor: eyJibG9ja19jb250ZXh0LmJsb2NrX3RpbWVzdGFtcCI6IHsiJGRhdGUiOiAiMjAyNS0wNC0xM1QwNzo1OTo1OVoifSwgIl9pZCI6IHsiJG9pZCI6ICI2N2ZiNmYwMDIwMDI4MWVjNGNjM2Q5NjgifX0=
✅ coins the most recently created fetched successfully
"""

@tool
def fetch_last_traded_coins(count: str) -> dict:
    """
    Fetches and logs the most recently traded Zora coins from an API.

    This function retrieves and logs the following details for each coin:
    - Name: The name of the coin
    - Symbol: The symbol of the coin
    - Coin Address: The unique address of the coin
    - Market Cap: The market capitalization of the coin
    - Volume 24h: The 24-hour trading volume of the coin

    It also handles pagination by logging the cursor for the next page of results if available.

    Args:
        count (int): The number of most recently traded Zora coins to fetch.

    Example:
        ✅ STDOUT (normal log):
        Recently Traded Coins (10 coins):
        1. OG BABYFACE (OG BABYFACE)
        Coin Address: 0x0acd5006a4ee321be73bbe7a033cec236c9a62db
        Market Cap: 39135.83
        Volume 24h: 24159.73
        -----------------------------------
        2. Max Force Feedback  (Max Force Feedback )
        Coin Address: 0x1249067f671e4a35bc51d13263fad178ec12da12
    """
    # return run_npx_script("zora_api/fetchLastTradedCoins.ts", count)
    return """
✅ STDOUT (normal log):
Recently Traded Coins (5 coins):
1. Mobil++ (Mobil++)
   Coin Address: 0xc902a3d2c3ca2f2b985bfa98fa1ed563a605f7ce
   Market Cap: 273.44
   Volume 24h: 15.08
-----------------------------------
2. zora Ship coin (zora Ship coin)
   Coin Address: 0x9c95f92ef924775bb6d40a1fdabd090c644cfeb6
   Market Cap: 1469.45
   Volume 24h: 0.75
-----------------------------------
3. horse (horse)
   Coin Address: 0xf1fc9580784335b2613c1392a530c1aa2a69ba3d
   Market Cap: 389871.78
   Volume 24h: 24009.8
-----------------------------------
4. IMG_0344 (IMG_0344)
   Coin Address: 0x7a3df87e7b2a1486f4af2b3fe2b03e02fc26e7d0
   Market Cap: 1620.11
   Volume 24h: 287.98
-----------------------------------
5. Base Batches | Homebase (Base Batches | Homebase)
   Coin Address: 0xd4ebca8d3af0662c23845b2678109d0dc5a6a1f4
   Market Cap: 2632.33
   Volume 24h: 60.67
-----------------------------------
Next page cursor: eyJibG9ja19jb250ZXh0LmJsb2NrX3RpbWVzdGFtcCI6IHsiJGRhdGUiOiAiMjAyNS0wNC0xM1QwODowMjoyMVoifSwgIl9pZCI6IHsiJG9pZCI6ICI2N2ZiNmY4ZTIwMDI4MWVjNGNjNjgwNjgifX0=
✅ coins that have been traded most recently fetched successfully
"""


@tool
def save_image_from_url(url: str) -> str:
    """
    Downloads an image from the provided URL and saves it to the local filesystem.
    
    Args:
        url (str): The URL of the image to be downloaded.
    
    The image is saved to the 'assets' directory with a filename based on the current timestamp.
    If the download is successful, the image is saved using the timestamp as the filename. 
    If the download fails or there is an error in saving, an error message will be returned.
    
    Example usage:
        save_image_from_url("https://media.decentralized-content.com/path/to/image")
    
    """
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    save_path = f"assets/{timestamp}.jpg"
    try:
        # Send an HTTP GET request to the URL
        response = requests.get(url)
        
        # Check if the request was successful (status code 200)
        if response.status_code == 200:
            # Open the file in write-binary mode and save the image
            with open(save_path, 'wb') as file:
                file.write(response.content)
            return (f"Image saved successfully at {save_path}")
        else:
            return (f"Failed to retrieve the image. HTTP status code: {response.status_code}")
    except Exception as e:
        return (f"Error while saving the image: {e}")