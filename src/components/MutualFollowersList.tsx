import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";

type User = {
    address: string;
    displayName?: string;
};

const MutualFollowersList: React.FC = () => {
    const { address } = useAccount();
    const [mutuals, setMutuals] = useState<User[]>([]);

    useEffect(() => {
        if (!address) return;

        // TODO: Replace with real data from Zora's Graph once available
        const fetchMutuals = async () => {
            const followers = ["0x123...", "0x456...", "0x789..."];
            const following = ["0x456...", "0xabc...", "0x789..."];

            const mutualAddresses = followers.filter((addr) =>
                following.includes(addr)
            );

            const mockUsers: User[] = mutualAddresses.map((addr) => ({
                address: addr,
                displayName: `User ${addr.slice(-4)}`
            }));

            setMutuals(mockUsers);
        };

        fetchMutuals();
    }, [address]);

    return (
        <div className="zora-panel">
            <h3 style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>
                👥 Mutual Followers
            </h3>
            {mutuals.length === 0 ? (
                <p style={{ color: "#aaa" }}>
                    No mutuals yet. Start following and getting followed!
                </p>
            ) : (
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {mutuals.map((user, idx) => (
                        <li
                            key={idx}
                            style={{
                                marginBottom: "0.75rem",
                                padding: "0.5rem 1rem",
                                background: "#1a1a1a",
                                borderRadius: "8px"
                            }}
                        >
                            🧑‍🚀 {user.displayName} —{" "}
                            <span style={{ color: "#aaa", fontSize: "0.85rem" }}>
                                {user.address}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MutualFollowersList;
