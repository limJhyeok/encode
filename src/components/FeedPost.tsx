import "../style.css";
import { useNavigate } from "react-router-dom";

type PostProps = {
    post: {
        id: string;
        author: string;
        imageUrl: string;
        description: string;
    };
};

const FeedPost = ({ post }: PostProps) => {
    const navigate = useNavigate();

    const handleShare = () => {
        const baseUrl = window.location.origin;
        const encoded = btoa(JSON.stringify({ token: "ZOR", sender: post.author }));
        const shareLink = `${baseUrl}/post/${post.id}?ref=${encoded}`;
        navigator.clipboard.writeText(shareLink);
        alert("🔗 Referral link copied!");
    };

    return (
        <div className="card feed-post">
            <div style={{ flex: 1 }}>
                <div className="post-header">
                    <strong>{post.author}</strong>
                </div>
                <div
                    className="post-image"
                    style={{
                        backgroundImage: `url(${post.imageUrl})`,
                        height: "240px",
                        borderRadius: "12px",
                        backgroundSize: "cover",
                        marginTop: "0.5rem",
                    }}
                    onClick={() => navigate(`/post/${post.id}`)}
                />
                <p style={{ marginTop: "0.5rem" }}>{post.description}</p>
                <button onClick={handleShare} className="primary" style={{ marginTop: "0.5rem" }}>
                    Share
                </button>
            </div>
        </div>
    );
};

export default FeedPost;
