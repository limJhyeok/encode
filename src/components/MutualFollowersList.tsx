// src/pages/FollowersPage.tsx

import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";

type User = {
    address: string;
    displayName: string;
    avatar: string;
};

const FollowersPage: React.FC = () => {
    const { address } = useAccount();

    const [followings, setFollowings] = useState<User[]>([]);
    const [holdings, setHoldings] = useState<User[]>([]);
    const [investors, setInvestors] = useState<User[]>([]);

    useEffect(() => {
        if (!address) return;

        // 🧪 Replace with Zora data later – for now, fill with demo users
        setFollowings([
            {
                address: "0x123...a",
                displayName: "zorb.eth",
                avatar: "🌀"
            },
            {
                address: "0x456...b",
                displayName: "mintlord.eth",
                avatar: "👑"
            }
        ]);

        setHoldings([
            {
                address: "0xaaa...111",
                displayName: "ethgirl.eth",
                avatar: "💅"
            },
            {
                address: "0xbbb...222",
                displayName: "you.eth",
                avatar: "🫵"
            }
        ]);

        setInvestors([
            {
                address: "0x333...444",
                displayName: "0xInvestX",
                avatar: "💰"
            },
            {
                address: "0x555...666",
                displayName: "0xAlphaWhale",
                avatar: "🐋"
            }
        ]);
    }, [address]);

    return (
        <div className="zora-panel" style={{ padding: "2rem" }}>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>👥 Your Network</h2>

            <Section title="Followings" users={followings} />
            <Section title="Holdings" users={holdings} />
            <Section title="Investors" users={investors} />
        </div>
    );
};

const Section = ({ title, users }: { title: string; users: User[] }) => (
    <div style={{ marginBottom: "2rem" }}>
        <h3 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>{title}</h3>
        {users.length === 0 ? (
            <p style={{ color: "#aaa" }}>No {title.toLowerCase()} found.</p>
        ) : (
            <ul style={{ listStyle: "none", padding: 0 }}>
                {users.map((user, idx) => (
                    <li
                        key={idx}
                        style={{
                            marginBottom: "0.75rem",
                            padding: "0.5rem 1rem",
                            background: "#1a1a1a",
                            borderRadius: "8px",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.75rem"
                        }}
                    >
                        <span style={{ fontSize: "1.5rem" }}>{user.avatar}</span>
                        <div>
                            <strong>{user.displayName}</strong>
                            <div style={{ color: "#aaa", fontSize: "0.85rem" }}>
                                {user.address}
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        )}
    </div>
);

export default FollowersPage;
