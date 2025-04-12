import { useParams } from "react-router-dom";
import { useEnsAvatar, useEnsName } from "wagmi";
import { useState, useEffect } from "react";
import FeedPost from "../components/FeedPost";
import Navbar from "../layout/Navbar";
import ZoraTabBar from "../layout/ZoraTabBar";

type MockPost = {
    id: number;
    author: string;
    imageUrl: string;
    description: string;
};

const UserProfile = () => {
    const { id } = useParams();
    const userAddress = id as `0x${string}`;

    const { data: ensName } = useEnsName({ address: userAddress });
    const { data: avatar } = useEnsAvatar({ name: ensName || undefined });

    const [posts, setPosts] = useState<MockPost[]>([]);

    useEffect(() => {
        // Mocked posts — replace with Mirror API later
        setPosts([
            {
                id: 1,
                author: userAddress,
                imageUrl: "https://picsum.photos/seed/123/600",
                description: "🚀 Loving the Zora vibes!",
            },
            {
                id: 2,
                author: userAddress,
                imageUrl: "https://picsum.photos/seed/456/600",
                description: "Minted my first AI-generated artwork 🧠",
            },
        ]);
    }, [userAddress]);

    return (
        <>
            <Navbar />
            <div style={{ padding: "1rem", paddingBottom: "4rem" }}>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "1rem",
                        marginBottom: "1rem",
                    }}
                >
                    <img
                        src={avatar || "https://placekitten.com/100/100"}
                        alt="Avatar"
                        style={{
                            width: "64px",
                            height: "64px",
                            borderRadius: "50%",
                            objectFit: "cover",
                        }}
                    />
                    <div>
                        <h2 style={{ margin: 0 }}>{ensName || userAddress.slice(0, 6) + "..."}</h2>
                        <p style={{ fontSize: "0.9rem", color: "#aaa" }}>{userAddress}</p>
                    </div>
                </div>

                <h3 style={{ marginBottom: "1rem" }}>🖼️ Feed</h3>
                {posts.map((post, idx) => (
                    <FeedPost
                        key={idx}
                        id={post.id}
                        author={post.author}
                        imageUrl={post.imageUrl}
                        description={post.description}
                    />
                ))}
            </div>
            <ZoraTabBar />
        </>
    );
};

export default UserProfile;
