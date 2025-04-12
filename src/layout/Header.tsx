// src/layout/Header.tsx
import { Link } from "react-router-dom";
import "../style.css";

const Header = () => {
    return (
        <header className="header">
            <div className="header-left">
                <Link to="/">
                    <img src="/zora-icon.png" alt="Zora Logo" className="logo-img" />
                </Link>
                <input
                    type="text"
                    placeholder="Search NFTs..."
                    className="search-bar"
                />
            </div>
            <div className="header-right">
                <Link to="/" className="nav-link">
                    Explore
                </Link>
                <Link to="/create" className="nav-link">
                    Create
                </Link>
                <Link to="/user/0x123" className="nav-link">
                    Profile
                </Link>
                <button className="connect-btn">Connect Wallet</button>
            </div>
        </header>
    );
};

export default Header;