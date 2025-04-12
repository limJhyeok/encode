import { getCoinComments } from "@zoralabs/coins-sdk";
import { setApiKey } from "@zoralabs/coins-sdk";
import "dotenv/config";

type CoinResponse = {
    data?: any;
    error?: string;
};

if (!process.env.PRIVATE_KEY) {
    throw new Error("PRIVATE_KEY is not set in .env file");
}

setApiKey(process.env.PRIVATE_KEY);

export async function fetchCoinComments(
  coinAddress: string
): Promise<{ logs: string; error?: string }> {
  let logs = "";
  const log = (...args: any[]) => {
    const message = args.map(String).join(" ");
    logs += message + "\n";
    console.log(...args);
  };

  if (!coinAddress) {
    log("❌ Coin address is required.");
    return { logs, error: "Coin address is missing" };
  }

  try {
    const response = await getCoinComments({
      address: coinAddress,
      chain: 8453,
      after: undefined,
      count: 20,
    });

    if (!response || !response.data) {
      log("❌ Invalid response from the API.");
      return { logs, error: "Invalid response from the API" };
    }

    const comments =
      response.data?.zora20Token?.zoraComments?.edges || [];

    log(`🗨️ Found ${comments.length} comments\n`);

    comments.forEach((edge, index: number) => {
      log(`Comment ${index + 1}:`);
      log(`- Author: ${edge.node?.userProfile?.handle || edge.node?.userAddress}`);
      log(`- Text: ${edge.node?.comment}`);
      log(`- Created At: ${edge.node?.timestamp}`);

      const replies = edge.node?.replies?.edges || [];
      replies.forEach((reply: any, replyIndex: number) => {
        log(`- Reply ${replyIndex + 1}: ${reply.node.text}`);
      });

      log("-----------------------------------");
    });

    const nextCursor =
      response.data?.zora20Token?.zoraComments?.pageInfo?.endCursor;
    if (nextCursor) {
      log(`🔁 Next page cursor: ${nextCursor}`);
    }

    return { logs };

  } catch (error) {
    if (error instanceof Error) {
      log("❌ Error while fetching comments:", error.message);
      return { logs, error: error.message };
    } else {
      log("❌ Unknown error while fetching comment:", String(error));
      return { logs, error: "Unknown error occurred" };
    }
  }
}


const args = process.argv.slice(2);
if (!args[0]) {
  console.error("❌ Please provide a coin address as argument.");
  process.exit(1);
}

const coinAddress = args[0];

fetchCoinComments(coinAddress)
  .then((res) => {
    if (res.error) {
      console.error("❌ Error:", res.error);
    } else {
      console.log("✅ Comments fetched successfully");
    }
  })
  .catch((err) => {
    console.error("❌ Error executing function:", err);
    process.exit(1);
  });
