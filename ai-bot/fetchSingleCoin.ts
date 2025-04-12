import { createCoin, CreateCoinArgs, getCoin, validateMetadataURIContent, ValidMetadataURI } from "@zoralabs/coins-sdk";
import { createWalletClient, createPublicClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { base, baseSepolia } from "viem/chains";
import "dotenv/config";
import { setApiKey } from "@zoralabs/coins-sdk";

if (!process.env.PRIVATE_KEY) {
  throw new Error("PRIVATE_KEY is not set in .env file");
}

// Set up your API key
setApiKey(process.env.PRIVATE_KEY);

type CoinResponse = {
  data?: any;
  error?: string;
};


export async function fetchSingleCoin(
  coinAddress: string
): Promise<{ logs: string; error?: string }> {
  let logs = "";

  const log = (...args: any[]) => {
    const message = args.map(String).join(" ");
    logs += message + "\n";
    console.log(...args); // still log to console if you want
  };

  if (!coinAddress) {
    log("❌ Coin address is required.");
    return { logs, error: "Coin address is missing" };
  }

  try {
    const response = await getCoin({
      address: coinAddress,
      chain: base.id,
    });

    if (!response || !response.data) {
      log("❌ Invalid response from the API.");
      return { logs, error: "Invalid response from the API" };
    }

    const coin = response.data?.zora20Token;
    if (!coin) {
      log("❌ Coin details not found for the address:", coinAddress);
      return { logs, error: "Coin not found" };
    }

    log("Coin Details:");
    log("- Coin Address:", coin.address || "N/A");
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

    return { logs };
  } catch (error) {
    if (error instanceof Error) {
      log("❌ Error while fetching coin:", error.message);
      return { logs, error: error.message };
    } else {
      log("❌ Unknown error while fetching coin:", error);
      return { logs, error: "Unknown error occurred" };
    }
  }
}


// CLI logic to call fetchSingleCoin (if this is run from the command line)
const args = process.argv.slice(2);
if (!args[0]) {
  console.error("❌ Please provide a coin address as argument.");
  process.exit(1);
}

const coinAddress = args[0];

fetchSingleCoin(coinAddress)
  .then((res) => {
    if (res.error) {
      console.error("❌ Error:", res.error);
    } else {
      console.log("✅ Coin fetched successfully");
    }
  })
  .catch((err) => {
    console.error("❌ Error executing function:", err);
    process.exit(1);
  });
