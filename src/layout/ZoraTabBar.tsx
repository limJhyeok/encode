import { Link, useLocation } from "react-router-dom";
import "../style.css";
import homeIcon from "../assets/zora-icon.png"; // Replace with better icon if you want
import aiIcon from "../assets/logo.svg";         // Placeholder icons
import chatIcon from "../assets/zora-icon.png";

const ZoraTabBar = () => {
    const location = useLocation();

    return (
        <nav className="zora-tabbar">
            <Link to="/" className={`tab-link ${location.pathname === "/" ? "active" : ""}`}>
                <img src={homeIcon} alt="Home" />
            </Link>
            <Link to="/dm" className={`tab-link ${location.pathname === "/dm" ? "active" : ""}`}>
                <img src={chatIcon} alt="DM" />
            </Link>
            <Link to="/ai" className={`tab-link ${location.pathname === "/ai" ? "active" : ""}`}>
                <img src={aiIcon} alt="AI" />
            </Link>
        </nav>
    );
};

export default ZoraTabBar;
