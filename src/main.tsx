import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

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
import "./style.css";
import { Toaster } from "react-hot-toast";

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
