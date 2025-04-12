import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import AIAssistantButton from "./AIAssistantButton";
import MutualFollowersList from "./MutualFollowersList";
import SharePanel from "./SharePanel";

import "../style.css";

type CoinScore = {
    coin_name: string;
    score: number;
};

const CoinList: React.FC = () => {
    const { address } = useAccount();

    const [coins, setCoins] = useState<CoinScore[]>([]);
    const [favorites, setFavorites] = useState<string[]>([]);
    const [roi, setRoi] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        fetch("http://127.0.0.1:8001/score")
            .then((res) => res.json())
            .then((data) => setCoins(data))
            .catch((err) => {
                console.error("Failed to load coins:", err);
                toast.error("Failed to load coin scores");
            });
    }, []);

    const handleRebalance = async () => {
        if (!address) {
            toast.error("⚠️ Please connect your wallet");
            return;
        }

        if (favorites.length === 0) {
            toast("⭐ Select at least one coin");
            return;
        }

        try {
            const res = await fetch("http://127.0.0.1:8001/rebalance", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ favorites }),
            });
            const data = await res.json();
            toast.success("✅ Portfolio Rebalanced");
            setRoi(data.roi);
            setShowResult(true);
        } catch (err) {
            console.error("Rebalance failed:", err);
            toast.error("❌ Rebalance failed");
        }
    };

    const toggleFavorite = (coin: string) => {
        setFavorites((prev) =>
            prev.includes(coin) ? prev.filter((c) => c !== coin) : [...prev, coin]
        );
    };

    return (
        <div className="container">
            <h1 style={{ fontWeight: 700 }}>Zorabot 🧠 Coin Scores</h1>
            <ConnectButton />

            <div style={{ marginTop: "2rem" }}>
                {coins.map((coin, idx) => (
                    <div className="card" key={idx}>
                        <span>
                            {coin.coin_name}: <strong>{coin.score}</strong>
                        </span>
                        <button
                            className="primary"
                            onClick={() => toggleFavorite(coin.coin_name)}
                        >
                            {favorites.includes(coin.coin_name) ? "⭐" : "☆"}
                        </button>
                    </div>
                ))}
            </div>

            {favorites.length > 0 && (
                <div style={{ marginTop: "2rem" }}>
                    <h3>⭐ Your Watchlist</h3>
                    <ul>
                        {favorites.map((coin, idx) => (
                            <li key={idx}>{coin}</li>
                        ))}
                    </ul>
                </div>
            )}

            <button
                className="primary"
                style={{ marginTop: "1rem" }}
                onClick={handleRebalance}
            >
                🔁 Rebalance
            </button>

            <AnimatePresence>
                {showResult && roi !== null && (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 40 }}
                        transition={{ duration: 0.6 }}
                        style={{
                            marginTop: "2rem",
                            background: "#222",
                            padding: "1rem",
                            borderRadius: "12px",
                        }}
                    >
                        <h4>📈 ROI Estimate</h4>
                        <p
                            style={{
                                fontWeight: "bold",
                                color: roi > 0 ? "#0f0" : "#f66",
                            }}
                        >
                            {roi > 0 ? "📈" : "📉"} {roi.toFixed(2)}%
                        </p>
                        <button
                            onClick={() => setShowResult(false)}
                            style={{
                                marginTop: "0.5rem",
                                background: "transparent",
                                border: "1px solid white",
                                padding: "0.3rem 0.75rem",
                                borderRadius: "8px",
                                color: "white",
                                cursor: "pointer",
                            }}
                        >
                            ✖ Hide
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            <MutualFollowersList />
            <SharePanel />
            <AIAssistantButton />
        </div>
    );
};

export default CoinList;
