import "dotenv/config";
import { setApiKey } from "@zoralabs/coins-sdk";
import { getCoinsTopGainers } from "@zoralabs/coins-sdk";
 
if (!process.env.PRIVATE_KEY) {
    throw new Error("PRIVATE_KEY is not set in .env file");
}
 
// Set up your API key
setApiKey(process.env.PRIVATE_KEY);

type CoinResponse = {
    data?: any;
    error?: string;
  };

async function fetchTopGainers(count: number): Promise<{ logs: string; error?: string }> {
  let logs = "";
  const log = (...args: any[]) => {
    const message = args.map(String).join(" ");
    logs += message + "\n";
    console.log(...args);
  };

  // Validate count
  if (!count) {
    log("❌ count is required.");
    return {logs, error: "count is missing" };
  }
  try{
    const response = await getCoinsTopGainers({
        count: count,        // Optional: number of coins per page
        after: undefined, // Optional: for pagination
      });

      if (!response || !response.data) {
        log("❌ Invalid response from the API.");
        return {logs, error: "Invalid response from the API" };
      }
     
      const tokens = response.data?.exploreList?.edges?.map((edge: any) => edge.node);
      
      log(`Top Gainers (${tokens?.length || 0} coins):`);
      
      tokens?.forEach((coin: any, index: number) => {
        const percentChange = coin.marketCapDelta24h 
          ? `${parseFloat(coin.marketCapDelta24h).toFixed(2)}%` 
          : "N/A";
        
        log(`${index + 1}. ${coin.name} (${coin.symbol})`);
        log(`   24h Change: ${percentChange}`);
        log(`   Market Cap: ${coin.marketCap}`);
        log(`   Volume 24h: ${coin.volume24h}`);
        log("- Name:", coin.name);
        log("- Symbol:", coin.symbol);
        log("- Description:", coin.description);
        log("- Total Supply:", coin.totalSupply);
        log("- Market Cap:", coin.marketCap);
        log("- 24h Volume:", coin.volume24h);
        log("- coin address:", coin.address);
        log("- Creator:", coin.creatorAddress);
        log("- Created At:", coin.createdAt);
        log("- Unique Holders:", coin.uniqueHolders);
        log('-----------------------------------');
      });
      
      // For pagination
      if (response.data?.exploreList?.pageInfo?.endCursor) {
        log("Next page cursor:", response.data?.exploreList?.pageInfo?.endCursor);
      }
      
      return { logs };
  } catch (error) {
    if (error instanceof Error) {
        console.error("❌ Error while fetching Coins with the highest market cap increase in the last 24 hours.:", error.message);
        return {logs, error: error.message };
        } else {
        console.error("❌ Unknown error while fetching Coins with the highest market cap increase in the last 24 hours.:", error);
        return {logs, error: "Unknown error occurred" };
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

fetchTopGainers(count)
  .then((res) => {
    if (res.error) {
      console.error("❌ Error:", res.error);
    } else {
      console.log("✅ Coin(s) with the highest market cap increase in the last 24 hours. fetched successfully");
    }
  })
  .catch((err) => {
    console.error("❌ Error executing function:", err);
    process.exit(1);
  });
