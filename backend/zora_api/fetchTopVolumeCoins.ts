import "dotenv/config";
import { setApiKey } from "@zoralabs/coins-sdk";
import { getCoinsTopVolume24h } from "@zoralabs/coins-sdk";

if (!process.env.PRIVATE_KEY) {
  throw new Error("PRIVATE_KEY is not set in .env file");
}

// Set up your API key
setApiKey(process.env.PRIVATE_KEY);

type CoinResponse = {
  data?: any;
  error?: string;
};

async function fetchTopVolumeCoins(
  count: number
): Promise<{ logs: string; error?: string }> {
  let logs = "";
  const log = (...args: any[]) => {
    const message = args.map(String).join(" ");
    logs += message + "\n";
    console.log(...args);
  };
  // Validate count
  if (!count) {
    log("❌ count is required.");
    return { logs, error: "count is missing" };
  }
  try {
    const response = await getCoinsTopVolume24h({
      count: count,        // Optional: number of coins per page
      after: undefined, // Optional: for pagination
    });

    if (!response || !response.data) {
      log("❌ Invalid response from the API.");
      return { logs, error: "Invalid response from the API" };
    }
    const tokens = response.data?.exploreList?.edges?.map((edge: any) => edge.node);

    log(`Top Volume Coins (${tokens?.length || 0} coins):`);

    tokens?.forEach((coin: any, index: number) => {
      log(`${index + 1}. ${coin.name} (${coin.symbol})`);
      log(`   Volume 24h: ${coin.volume24h}`);
      log(`   Coin Address: ${coin.address}`);
      log(`   Market Cap: ${coin.marketCap}`);
      log(`   Holders: ${coin.uniqueHolders}`);
      log('-----------------------------------');
    });

    // For pagination
    if (response.data?.exploreList?.pageInfo?.endCursor) {
      log("Next page cursor:", response.data?.exploreList?.pageInfo?.endCursor);
    }

    return { logs };
  } catch (error) {
    if (error instanceof Error) {
      log("❌ Error while fetching Coins with the highest trading volume in the last 24 hours:", error.message);
      return { logs, error: error.message };
    } else {
      log("❌ Unknown error while fetching Coins with the highest trading volume in the last 24 hours:", error);
      return { logs, error: "Unknown error occurred" };
    }
  }
}

const args = process.argv.slice(2);
if (!args[0]) {
  console.error("❌ Please provide a number of coins as argument.");
  process.exit(1);
}

const count = Number(args[0]); // Convert the string argument to a number

if (isNaN(count)) {
  throw new Error('The argument must be a valid number.');
}

fetchTopVolumeCoins(count)
  .then((res) => {
    if (res.error) {
      console.error("❌ Error:", res.error);
    } else {
      console.log("✅ Coin(s) with the highest trading volume in the last 24 hours.. fetched successfully");
    }
  })
  .catch((err) => {
    console.error("❌ Error executing function:", err);
    process.exit(1);
  });
