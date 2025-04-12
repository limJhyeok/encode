import { Link } from "react-router-dom";
import "../style.css";
import zoraLogo from "../assets/zora-icon.png";

const Navbar = () => {
    return (
        <header className="zora-navbar">
            <div className="nav-left">
                <Link to="/">
                    <img src={zoraLogo} alt="Zora Logo" className="zora-logo" />
                </Link>
                <span className="zora-title">ZORABOT</span>
            </div>

            <div className="nav-right">
                <Link to="/dm" className="nav-icon" title="Messages">
                    💬
                </Link>
                <Link to="/ai" className="nav-icon" title="Zorabot AI">
                    🤖
                </Link>
                <Link to="/followers" className="nav-icon" title="Followers">
                    👥
                </Link>
            </div>
        </header>
    );
};

export default Navbar;
