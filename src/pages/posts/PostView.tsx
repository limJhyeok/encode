import { useEffect, useState } from "react";
import { getEnsName } from "@wagmi/core";
import { mainnet } from "wagmi/chains";
import { config } from "../../wagmiConfig";
import Navbar from "../../layout/Navbar";
import "../../style.css";

type PostViewProps = {
    postId: string;
};

type Post = {
    id: string;
    address: `0x${string}`;
    imageUrl: string;
    description: string;
};

const mockPost: Post = {
    id: "12345",
    address: "0x1234567890abcdef1234567890abcdef12345678",
    imageUrl: "https://placekitten.com/800/500",
    description: "This is a sample post with Zora AI insights and swap suggestion.",
};

const PostView: React.FC<PostViewProps> = ({ postId }) => {
    console.log("🪵 Rendering PostView with postId:", postId);
    const [post, setPost] = useState<Post | null>(null);
    const [ensName, setEnsName] = useState<string | null>(null);

    useEffect(() => {
        // Simulate fetching post by ID
        if (postId === mockPost.id) {
            setPost(mockPost);

            getEnsName(config, {
                address: mockPost.address,
                chainId: mainnet.id,
            }).then((name) => {
                if (name) setEnsName(name);
            });
        }
    }, [postId]);

    if (!post) {
        return (
            <div style={{ color: "#fff", padding: "2rem" }}>
                <h2>🚫 Post not found or invalid post ID: {postId}</h2>
            </div>
        );
    }

    return (
        <>
            <Navbar />
            <div className="container" style={{ marginBottom: "4rem" }}>
                <div className="card" style={{ flexDirection: "column", alignItems: "flex-start" }}>
                    <img
                        src={post.imageUrl}
                        alt="Post"
                        style={{ width: "100%", borderRadius: "12px", marginBottom: "1rem" }}
                    />
                    <p style={{ fontSize: "0.9rem", color: "#ccc" }}>
                        Posted by: <strong>{ensName || `${post.address.slice(0, 6)}...`}</strong>
                    </p>
                    <p style={{ marginTop: "0.5rem" }}>{post.description}</p>
                    <button
                        onClick={() => {
                            const refLink = `${window.location.origin}/post/${post.id}?ref=${post.address}`;
                            navigator.clipboard.writeText(refLink);
                            alert("🔗 Referral link copied!");
                        }}
                        className="primary"
                        style={{ marginTop: "1rem" }}
                    >
                        🔗 Share this Post
                    </button>
                </div>
            </div>
        </>
    );
};

export default PostView;
