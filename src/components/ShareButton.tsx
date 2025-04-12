import React from "react";
import { generateReferralLink } from "../utils/ReferralLogic";
import toast from "react-hot-toast";

type ShareButtonProps = {
    coin: string;
    userAddress: string;
};

const ShareButton: React.FC<ShareButtonProps> = ({ coin, userAddress }) => {
    const handleShare = () => {
        if (!userAddress) {
            toast.error("Please connect your wallet to share.");
            return;
        }

        const link = generateReferralLink(userAddress, coin);

        // Copy to clipboard
        navigator.clipboard
            .writeText(link)
            .then(() => {
                toast.success("🔗 Referral link copied!");
            })
            .catch(() => {
                toast.error("Failed to copy referral link.");
            });
    };

    return (
        <button
            onClick={handleShare}
            style={{
                background: "#fff",
                color: "#111",
                padding: "0.5rem 1.2rem",
                fontSize: "0.95rem",
                borderRadius: "8px",
                cursor: "pointer",
                marginTop: "0.5rem",
                border: "1px solid #ccc",
            }}
        >
            📤 Share this coin
        </button>
    );
};

export default ShareButton;
