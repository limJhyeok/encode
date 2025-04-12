import Navbar from "../layout/Navbar";
import ZoraTabBar from "../layout/ZoraTabBar";

const HomePage = () => {
    return (
        <>
            <Navbar />
            <main className="home-container">
                <section className="feed-box">
                    {/* Placeholder for Zora-style feed */}
                    <div className="feed-placeholder">Zora Feed Coming Soon...</div>
                </section>
                <div className="share-section">
                    <button className="primary">🔗 Share Link</button>
                </div>
            </main>
            <ZoraTabBar />
        </>
    );
};

export default HomePage;
