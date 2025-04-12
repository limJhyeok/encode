import { getCoinsLastTraded } from "@zoralabs/coins-sdk";
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

 
async function fetchLastTradedCoins(count: number): Promise<{ logs: string; error?: string }>{
  let logs = "";
  // Validate count

  const log = (...args: any[]) => {
    const message = args.map(String).join(" ");
    logs += message + "\n";
    console.log(...args);
  };

  if (!count) {
    log("❌ count is required.");
    return {logs, error: "count is missing" };
  } 
  try {
    const response = await getCoinsLastTraded({
        count: count,        // Optional: number of coins per page
        after: undefined, // Optional: for pagination
      });

    if (!response || !response.data) {
        log("❌ Invalid response from the API.");
        return {logs, error: "Invalid response from the API" };
    }
    
      log(`Recently Traded Coins (${response.data?.exploreList?.edges?.length || 0} coins):`);
      
      response.data?.exploreList?.edges?.forEach((coin: any, index: number) => {
        log(`${index + 1}. ${coin.node.name} (${coin.node.symbol})`);
        log(`   Coin Address: ${coin.node.address}`);
        log(`   Market Cap: ${coin.node.marketCap}`);
        log(`   Volume 24h: ${coin.node.volume24h}`);
        log('-----------------------------------');
      });
      
      // For pagination
      if (response.data?.exploreList?.pageInfo?.endCursor) {
        log("Next page cursor:", response.data?.exploreList?.pageInfo?.endCursor);
      }
      
    return response;
  } catch (error) {
    if (error instanceof Error) {
        log("❌ Error while fetching coins that have been traded most recently:", error.message);
        return {logs, error: error.message };
    } else {
       log("❌ Unknown error while fetching coins that have been traded most recently:", error);
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

fetchLastTradedCoins(count)
  .then((res) => {
    if (res.error) {
      console.error("❌ Error:", res.error);
    } else {
      console.log("✅ coins that have been traded most recently fetched successfully");
    }
  })
  .catch((err) => {
    console.error("❌ Error executing function:", err);
    process.exit(1);
  });
