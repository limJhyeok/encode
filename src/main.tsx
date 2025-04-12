// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./style.css";

import {
    getDefaultConfig,
    RainbowKitProvider,
} from "@rainbow-me/rainbowkit";

import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
    mainnet,
    polygon,
    optimism,
    arbitrum,
    sepolia,
} from "wagmi/chains";

import "@rainbow-me/rainbowkit/styles.css";
import { Toaster } from "react-hot-toast";

// ✅ Setup RainbowKit/Wagmi config
const config = getDefaultConfig({
    appName: "Zorabot",
    projectId: "629c053d5acf76d358930aec059fa09c",
    chains: [mainnet, polygon, optimism, arbitrum, sepolia],
    ssr: false,
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                    <App />
                    <Toaster position="top-right" />
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    </React.StrictMode>
);
