import "../style.css";

const artImages = [
    "/images/art1.jpg",
    "/images/art2.jpg",
    "/images/art3.jpg",
    "/images/art4.jpg",
    "/images/art5.jpg",
    "/images/art6.jpg"
];

const mediaImages = [
    "/images/media1.jpg",
    "/images/media2.jpg",
    "/images/media3.jpg",
    "/images/media4.jpg",
    "/images/media5.jpg",
    "/images/media6.jpg"
];

export default function HomePage() {
    return (
        <div className="app-container">
            <div className="main-content">
                <div className="page-container">
                    <main className="post-page">

                        {/* 🔐 Sign in */}
                        <div className="zora-signin-section">
                            <button className="zora-signin-btn">Sign in with your Zora account</button>
                        </div>

                        {/* Content Boxes */}
                        <div className="content-pair-row">
                            {/* Art Section */}
                            <div className="content-pair">
                                <div className="content-box">
                                    <div className="grid-wrapper">
                                        {artImages.map((src, i) => (
                                            <div className="grid-cell" key={i}>
                                                <img src={src} alt={`Art ${i + 1}`} className="grid-img" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <button className="download-btn">Download for Mac</button>
                            </div>

                            {/* Media Section */}
                            <div className="content-pair">
                                <div className="content-box">
                                    <div className="grid-wrapper">
                                        {mediaImages.map((src, i) => (
                                            <div className="grid-cell" key={i}>
                                                <img src={src} alt={`Media ${i + 1}`} className="grid-img" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <button className="download-btn">Download for Windows</button>
                            </div>
                        </div>

                    </main>
                </div>
            </div>
        </div>
    );
}
