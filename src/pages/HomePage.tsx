import "../style.css";

export default function HomePage() {
    return (
        <div className="app-container">
            <div className="main-content">
                <div className="page-container">
                    <main className="post-page">

                        {/* Wrap each box + button together */}
                        <div className="content-pair-row">
                            <div className="content-pair">
                                <div className="content-box">
                                    <div className="grid-wrapper">
                                        {[...Array(6)].map((_, i) => (
                                            <div className="grid-cell" key={i}>
                                                Cell {i + 1}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <button className="download-btn">Download for Mac</button>

                            </div>

                            <div className="content-pair">
                                <div className="content-box">
                                    <div className="grid-wrapper">
                                        {[...Array(6)].map((_, i) => (
                                            <div className="grid-cell" key={i}>
                                                Cell {i + 1}
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
