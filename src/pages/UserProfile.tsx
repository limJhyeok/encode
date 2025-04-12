import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../layout/Navbar";
import ZoraTabBar from "../layout/ZoraTabBar";
import FeedPost from "../components/FeedPost";

type Post = {
    id: string;
    author: string;
    imageUrl: string;
    description: string;
};

const UserProfile = () => {
    const { id } = useParams<{ id: string }>();
    const [ens, setEns] = useState<string | null>(null);
    const [avatar, setAvatar] = useState<string | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        if (!id) return;

        const lookupENS = async () => {
            const name = await fetch(`https://ensdata.net/profile/${id}`).then((res) => res.json());
            setEns(name?.displayName || id);
            setAvatar(name?.avatar);
        };

        const fetchPosts = async () => {
            const fakePosts: Post[] = [
                {
                    id: "1",
                    author: id,
                    imageUrl: "https://source.unsplash.com/random/300x200?sig=1",
                    description: "Zora Mirror: New Collection 🧵",
                },
                {
                    id: "2",
                    author: id,
                    imageUrl: "https://source.unsplash.com/random/300x200?sig=2",
                    description: "AI-assisted Alpha dropped 🚀",
                },
            ];
            setPosts(fakePosts);
        };

        lookupENS();
        fetchPosts();
    }, [id]);

    return (
        <>
            <Navbar />
            <div className="container" style={{ marginTop: "1.5rem" }}>
                <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                    {avatar && (
                        <img
                            src={avatar}
                            alt="avatar"
                            style={{ width: 80, height: 80, borderRadius: "50%", marginBottom: "0.5rem" }}
                        />
                    )}
                    <h2>{ens}</h2>
                    <p style={{ color: "#aaa" }}>{id}</p>
                </div>

                {posts.map((post, index) => (
                    <FeedPost key={index} post={post} />
                ))}
            </div>
            <ZoraTabBar />
        </>
    );
};

export default UserProfile;
