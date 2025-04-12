// src/wagmiConfig.ts
import { http, createConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum, sepolia } from "wagmi/chains";

export const config = createConfig({
    chains: [mainnet, polygon, optimism, arbitrum, sepolia],
    transports: {
        [mainnet.id]: http(),
        [polygon.id]: http(),
        [optimism.id]: http(),
        [arbitrum.id]: http(),
        [sepolia.id]: http(),
    },
});
