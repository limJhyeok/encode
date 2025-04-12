import { getCoinComments } from "@zoralabs/coins-sdk";
import { setApiKey } from "@zoralabs/coins-sdk";
import "dotenv/config";
import { getProfile } from "@zoralabs/coins-sdk";

type CoinResponse = {
    data?: any;
    error?: string;
};

if (!process.env.PRIVATE_KEY) {
    throw new Error("PRIVATE_KEY is not set in .env file");
}

setApiKey(process.env.PRIVATE_KEY);
 
async function fetchUserProfile(
  identifier: string
): Promise<{ logs: string; error?: string }>{
  let logs = "";
  const log = (...args: any[]) => {
    const message = args.map(String).join(" ");
    logs += message + "\n";
    console.log(...args); // still log to console if you want
  };
  // Validate identifier
  if (!identifier) {
    log("❌ user identifier is required.");
    return {logs, error: "user identifier is missing" };
  }
  try {
    const response = await getProfile({
        identifier: identifier,
      });
      
      if (!response || !response.data) {
        console.error("❌ Invalid response from the API.");
        return {logs, error: "Invalid response from the API" };
      }
  
      const profile: any = response?.data?.profile;
      
      if (profile) {
        log("Profile Details:");
        log("- Handle:", profile.handle);
        log("- Display Name:", profile.displayName);
        log("- Bio:", profile.bio);
        
        // Access profile image if available
        if (profile.avatar?.medium) {
          log("- Profile Image:", profile.avatar.medium);
        }
        
        // Access social links if available
        if (profile?.linkedWallets && profile?.linkedWallets?.edges?.length || 0 > 0) {
          log("Linked Wallets:");
          profile?.linkedWallets?.edges?.forEach((link: any) => {
            log(`- ${link?.node?.walletType}: ${link?.node?.walletAddress}`);
          });
        }
      } else {
        log("❌ Profile not found or user has not set up a profile");
        return {logs, error: "Profile not found or user has not set up a profile" };
      }
      
      return { logs };
  } catch (error) {
    if (error instanceof Error) {
        console.error("❌ Error while fetching user profile:", error.message);
        return {logs, error: error.message };
        } else {
        console.error("❌ Unknown error while fetching user profile:", error);
        return {logs, error: "Unknown error occurred" };
        }
    }
}


// CLI logic to call fetchSingleCoin (if this is run from the command line)
const args = process.argv.slice(2);
if (!args[0]) {
  console.error("❌ Please provide a user identifier as argument.");
  process.exit(1);
}

const identifier = args[0];

fetchUserProfile(identifier)
  .then((res) => {
    if (res.error) {
      console.error("❌ Error:", res.error);
    } else {
      console.log("✅ user profile fetched successfully");
    }
  })
  .catch((err) => {
    console.error("❌ Error executing function:", err);
    process.exit(1);
  });