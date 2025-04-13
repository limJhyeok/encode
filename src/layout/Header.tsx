// src/layout/Header.tsx
import { Link } from "react-router-dom";
import "../style.css";

const Header = () => {
    return (
        <header className="zora-header">
            <div className="header-left">
                <Link to="/" className="logo-text">
                    <strong>Zorak</strong>
                </Link>

                <input
                    type="text"
                    placeholder="Search NFTs..."
                    className="search-bar"
                />
            </div>

            <nav className="nav-links header-right">
                <Link to="/explore" className="nav-link">Explore</Link>
                <Link to="/create" className="nav-link">Create</Link>
                <Link to="/profile" className="nav-link">Profile</Link>
            </nav>
        </header>
    );
};

export default Header;