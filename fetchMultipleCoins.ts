import { getCoins } from "@zoralabs/coins-sdk";
import { base } from "viem/chains";
import { setApiKey } from "@zoralabs/coins-sdk";
import "dotenv/config";

if (!process.env.PRIVATE_KEY) {
    throw new Error("PRIVATE_KEY is not set in .env file");
}

setApiKey(process.env.PRIVATE_KEY);


type CoinResponse = {
    data?: any;
    error?: string;
};
  
// Utility function to fetch a single coin (reused inside the main function)
async function fetchMultipleCoins(
    coinAddresses: string[]
  ): Promise<{ logs: string; error?: string }> {
    let logs = "";
  
    const log = (...args: any[]) => {
      const message = args.map(String).join(" ");
      logs += message + "\n";
      console.log(...args);
    };
  
    if (!coinAddresses || coinAddresses.length === 0) {
      log("❌ Coin address is required.");
      return { logs, error: "Coin address is missing" };
    }
  
    try {
      const response = await getCoins({
        coins: coinAddresses.map((address) => ({
          chainId: base.id,
          collectionAddress: address,
        })),
      });
  
      if (!response || !response.data) {
        log("❌ Invalid response from the API.");
        return { logs, error: "Invalid response from the API" };
      }
  
      const coins = response.data?.zora20Tokens;
      if (!coins || coins.length === 0) {
        log("❌ No coins found for the given addresses.");
        return { logs, error: "No coin data found" };
      }
  
      coins.forEach((coin: any, index: number) => {
        if (!coin) {
          log(`❌ Coin not found for address index ${index}`);
          return;
        }
  
        log("Coin Details:");
        log("Coin Address:", coin.address || "N/A");
        log("- Name:", coin.name || "N/A");
        log("- Symbol:", coin.symbol || "N/A");
        log("- Description:", coin.description || "N/A");
        log("- Total Supply:", coin.totalSupply || "N/A");
        log("- Market Cap:", coin.marketCap || "N/A");
        log("- 24h Volume:", coin.volume24h || "N/A");
        log("- Creator:", coin.creatorAddress || "N/A");
        log("- Created At:", coin.createdAt || "N/A");
        log("- Unique Holders:", coin.uniqueHolders || "N/A");
  
        if (coin.mediaContent?.previewImage) {
          log("- Preview Image:", coin.mediaContent.previewImage);
        } else {
          log("- No preview image available.");
        }
        log("-----------------------------------");
      });
  
      return { logs };
    } catch (error) {
      if (error instanceof Error) {
        log(`❌ Error fetching coin ${coinAddresses}:`, error.message);
        return { logs, error: error.message };
      } else {
        log(`❌ Unknown error fetching coin ${coinAddresses}:`, error);
        return { logs, error: "Unknown error occurred" };
      }
    }
  }
  

const coinAddresses = process.argv.slice(2); // pass args from CLI

fetchMultipleCoins(coinAddresses).then((res) => {
    if (res.error) {
      console.error("❌ Error:", res.error);
    } else {
      console.log("✅ Coins fetched successfully");
    }
  })
  .catch((err) => {
    console.error("❌ Error executing function:", err);
    process.exit(1);
  });
