// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./style.css";

import {
    getDefaultConfig,
    RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
    sepolia,
    mainnet,
    polygon,
    optimism,
    arbitrum,
} from "wagmi/chains";

import "@rainbow-me/rainbowkit/styles.css";
import { Toaster } from "react-hot-toast";

// ✅ Define chains & config
const config = getDefaultConfig({
    appName: "Zorabot",
    projectId: "629c053d5acf76d358930aec059fa09c",
    chains: [mainnet, polygon, optimism, arbitrum, sepolia],
    ssr: false,
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <WagmiProvider config={config}>
                <QueryClientProvider client={queryClient}>
                    <RainbowKitProvider>
                        <App />
                        <Toaster position="top-right" />
                    </RainbowKitProvider>
                </QueryClientProvider>
            </WagmiProvider>
        </BrowserRouter>
    </React.StrictMode>
);
