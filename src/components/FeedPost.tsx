// src/components/FeedPost.tsx
import { useEnsAvatar, useEnsName } from "wagmi";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import "../style.css";

export type PostProps = {
    post: {
        id: string;
        address: `0x${string}`;
        content: string;
        timestamp: string;
    };
};

const FeedPost = ({ post }: PostProps) => {
    const { address } = useAccount();
    const { data: ensName } = useEnsName({
        address: post.address,
        chainId: 1,
    });
    const { data: avatar } = useEnsAvatar({
        name: ensName ? ensName.toLowerCase() : undefined,
        chainId: 1,
    });

    const [isMine, setIsMine] = useState(false);

    useEffect(() => {
        if (address && post.address.toLowerCase() === address.toLowerCase()) {
            setIsMine(true);
        }
    }, [address, post.address]);

    return (
        <div className="card">
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <img
                    src={avatar || "https://placekitten.com/64/64"}
                    alt="avatar"
                    style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "999px",
                        objectFit: "cover",
                    }}
                />
                <div>
                    <div style={{ fontWeight: "bold" }}>{ensName || post.address.slice(0, 6)}...</div>
                    <div style={{ fontSize: "0.8rem", color: "#888" }}>
                        {new Date(post.timestamp).toLocaleString()}
                    </div>
                </div>
            </div>

            <div style={{ marginTop: "1rem", fontSize: "1rem" }}>{post.content}</div>
            {isMine && <div style={{ fontSize: "0.75rem", color: "#ccc" }}>📌 This is your post</div>}
        </div>
    );
};

export default FeedPost;
