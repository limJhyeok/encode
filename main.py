import subprocess
import os
from smolagents import OpenAIServerModel, CodeAgent, DuckDuckGoSearchTool, tool


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

    return run_npx_script("fetchSingleCoin.ts", coin_address)

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
    return run_npx_script("fetchMultipleCoins.ts", *coin_addresses)

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
    return run_npx_script("fetchCoinComments.ts", coin_address)

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

    return run_npx_script("fetchUserProfile.ts", user_id)

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

    run_npx_script("fetchTopGainers.ts", count)

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

    return run_npx_script("fetchTopVolumeCoins.ts", count)

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

    return run_npx_script("fetchMostValuableCoins.ts", count)

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


    return run_npx_script("fetchNewCoins.ts", count)

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

    return run_npx_script("fetchLastTradedCoins.ts", count)

import requests
from datetime import datetime
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



from io import BytesIO
from time import sleep

import helium
import PIL.Image
from dotenv import load_dotenv
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys

from smolagents.agents import ActionStep
from smolagents.cli import load_model
from PIL import Image
def save_screenshot(memory_step: ActionStep, agent: CodeAgent) -> None:
    sleep(2.0)  # Let JavaScript animations happen before taking the screenshot
    driver = helium.get_driver()
    current_step = memory_step.step_number
    if driver is not None:
        for previous_memory_step in agent.memory.steps:  # Remove previous screenshots from logs for lean processing
            if isinstance(previous_memory_step, ActionStep) and previous_memory_step.step_number <= current_step - 2:
                previous_memory_step.observations_images = None
        png_bytes = driver.get_screenshot_as_png()
        image = PIL.Image.open(BytesIO(png_bytes))
        print(f"Captured a browser screenshot: {image.size} pixels")
        memory_step.observations_images = [image.copy()]  # Create a copy to ensure it persists, important!

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    save_path = f"assets/{timestamp}.jpg"

    # Convert the image to a byte stream
    with BytesIO() as img_byte_arr:
        image.save(img_byte_arr, format='JPEG')  # Save image as JPEG in memory
        img_byte_arr.seek(0)  # Rewind the byte stream to the beginning
        
        # Write the byte stream to a file
        with open(save_path, 'wb') as file:
            file.write(img_byte_arr.read())  # Write the bytes to the file
    # Update observations with current URL
    url_info = f"Current url: {driver.current_url}"
    memory_step.observations = (
        url_info if memory_step.observations is None else memory_step.observations + "\n" + url_info
    )
    return


@tool
def search_item_ctrl_f(text: str, nth_result: int = 1) -> str:
    """
    Searches for text on the current page via Ctrl + F and jumps to the nth occurrence.
    Args:
        text: The text to search for
        nth_result: Which occurrence to jump to (default: 1)
    """
    elements = driver.find_elements(By.XPATH, f"//*[contains(text(), '{text}')]")
    if nth_result > len(elements):
        raise Exception(f"Match n°{nth_result} not found (only {len(elements)} matches found)")
    result = f"Found {len(elements)} matches for '{text}'."
    elem = elements[nth_result - 1]
    driver.execute_script("arguments[0].scrollIntoView(true);", elem)
    result += f"Focused on element {nth_result} of {len(elements)}"
    return result


@tool
def go_back() -> None:
    """Goes back to previous page."""
    driver.back()


@tool
def close_popups() -> str:
    """
    Closes any visible modal or pop-up on the page. Use this to dismiss pop-up windows! This does not work on cookie consent banners.
    """
    webdriver.ActionChains(driver).send_keys(Keys.ESCAPE).perform()


def initialize_driver():
    """Initialize the Selenium WebDriver."""
    chrome_options = webdriver.ChromeOptions()
    chrome_options.add_argument("--force-device-scale-factor=1")
    chrome_options.add_argument("--window-size=1000,1350")
    chrome_options.add_argument("--disable-pdf-viewer")
    chrome_options.add_argument("--window-position=0,0")
    return helium.start_chrome(headless=False, options=chrome_options)


def initialize_agent(model):
    """Initialize the CodeAgent with the specified model."""
    return CodeAgent(
        tools=[DuckDuckGoSearchTool(), go_back, close_popups, search_item_ctrl_f],
        model=model,
        additional_authorized_imports=["helium"],
        step_callbacks=[save_screenshot],
        max_steps=20,
        verbosity_level=2,
    )


helium_instructions = """
Use your web_search tool when you want to get Google search results.
Then you can use helium to access websites. Don't use helium for Google search, only for navigating websites!
Don't bother about the helium driver, it's already managed.
We've already ran "from helium import *"
Then you can go to pages!
Code:
```py
go_to('github.com/trending')
```<end_code>

You can directly click clickable elements by inputting the text that appears on them.
Code:
```py
click("Top products")
```<end_code>

If it's a link:
Code:
```py
click(Link("Top products"))
```<end_code>

If you try to interact with an element and it's not found, you'll get a LookupError.
In general stop your action after each button click to see what happens on your screenshot.
Never try to login in a page.

To scroll up or down, use scroll_down or scroll_up with as an argument the number of pixels to scroll from.
Code:
```py
scroll_down(num_pixels=1200) # This will scroll one viewport down
```<end_code>

When you have pop-ups with a cross icon to close, don't try to click the close icon by finding its element or targeting an 'X' element (this most often fails).
Just use your built-in tool `close_popups` to close them:
Code:
```py
close_popups()
```<end_code>

You can use .exists() to check for the existence of an element. For example:
Code:
```py
if Text('Accept cookies?').exists():
    click('I accept')
```<end_code>

Proceed in several steps rather than trying to solve the task in one shot.
And at the end, only when you have your answer, return your final answer.
Code:
```py
final_answer("YOUR_ANSWER_HERE")
```<end_code>

If pages seem stuck on loading, you might have to wait, for instance `import time` and run `time.sleep(20.0)`. But don't overuse this!
To list elements on page, DO NOT try code-based element searches like 'contributors = find_all(S("ol > li"))': just look at the latest screenshot you have and read it visually, or use your tool search_item_ctrl_f.
Of course, you can act on buttons like a user would do when navigating.
After each code blob you write, you will be automatically provided with an updated screenshot of the browser and the current browser url.
But beware that the screenshot will only be taken at the end of the whole action, it won't see intermediate states.
Don't kill the browser.
When you have modals or cookie banners on screen, you should get rid of them before you can click anything else.
"""

def run_webagent(prompt: str) -> None:
    # Load environment variables
    load_dotenv()

    # Initialize the model based on the provided arguments
    # model = load_model(model_type, model_id)
    model = OpenAIServerModel(
        model_id="gpt-4o-mini",
        api_base="https://api.openai.com/v1",
        api_key=os.environ["OPENAI_API_KEY"],
    ) 

    global driver
    driver = initialize_driver()
    agent = initialize_agent(model)

    # Run the agent with the provided prompt
    agent.python_executor("from helium import *")
    agent.run(prompt + helium_instructions)


def main():
    model = OpenAIServerModel(
        model_id="gpt-4o",
        api_base="https://api.openai.com/v1",
        api_key=os.environ["OPENAI_API_KEY"],
    )

    search_tool = DuckDuckGoSearchTool()
    zora_tools = [2
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
        tools=[search_tool] + zora_tools
    )
    query = "Which one would be the best for buying Zora coins now and analyze why do you think in detail. And save the image."
    try:
        result = agent.run(query)
        print(result)
        with open("agent_output.txt", "w") as file:
            file.write(str(result))
        print("✅ Result has been written to 'agent_output.txt'")
    except Exception as e:
        print(f"❌ Error during agent execution: {e}")

    # search_request = """
    #     Please navigate to https://zora.co/ and give me some cool pictures or videos in feed after analyzing the volume, market cap, comments, etc.
    # """
    # run_webagent(search_request)

if __name__ == "__main__":
    main()