// src/pages/HomePage.tsx
import Header from "../layout/Header";
import "../style.css";

export default function HomePage() {
    return (
        <div className="main-content">
            <Header />
            <div className="page-container">
                <main className="post-page">
                    <div className="post-container">
                        {/* Left Column: Content Placeholder */}
                        <div className="post-media">
                            <div className="placeholder-content">
                                [Content Placeholder]
                            </div>
                        </div>

                        {/* Right Column: Post Details */}
                        <div className="post-details">
                            {/* Post metadata */}
                            <div className="post-meta">
                                <span className="post-author">user01</span>
                                <span className="post-timestamp"> • Posted 30 mins ago</span>
                            </div>

                            {/* Price and holders */}
                            <div className="post-stats">
                                <span className="post-price">Price: 0.5 ETH</span>
                                <span className="post-holders"> • 164 holders</span>
                            </div>

                            {/* Share button */}
                            <button className="share-btn">Share</button>

                            {/* Comment section with vertical layout */}
                            <div className="comment-section">
                                <h4>Comments</h4>
                                <div className="comments-list">
                                    <p><strong>alex.eth</strong>: Y0X smooth af</p>
                                    <p><strong>nina.eth</strong>: Love this NFT!</p>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Add a comment..."
                                    className="comment-input"
                                />
                                <button className="comment-btn">Post Comment</button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}