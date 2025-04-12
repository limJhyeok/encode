import Sidebar from "../layout/Sidebar";
import "../style.css";

const HomePage = () => {
    return (
        <div className="zora-layout">
            <Sidebar />
            <main className="zora-feed">
                <div className="zora-post-card">
                    <div className="zora-post-image-placeholder" />
                    <div className="zora-post-actions">
                        <span>💚 $164</span>
                        <span>💬 6</span>
                        <span>🔁</span>
                        <button className="trade-btn">Trade</button>
                    </div>
                    <p className="zora-caption">❤️ Jesus <br /> y0x smooth af</p>
                </div>
            </main>
        </div>
    );
};

export default HomePage;
