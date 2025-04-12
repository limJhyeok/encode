// src/layout/Sidebar.tsx
import { Link, useLocation } from "react-router-dom";
import "../style.css";

const Sidebar = () => {
    const { pathname } = useLocation();

    return (
        <aside className="zora-sidebar">
            <Link to="/" className="sidebar-logo">
                <img src="/zora-icon.png" alt="Logo" />
            </Link>
            <nav className="sidebar-links">
                <Link to="/" className={pathname === "/" ? "active" : ""}>
                    <img src="/home.svg" alt="Home" className="sidebar-icon" />
                </Link>
                <Link to="/dm" className={pathname === "/dm" ? "active" : ""}>
                    <img src="/message.svg" alt="Messages" className="sidebar-icon" />
                </Link>
                <Link to="/followers" className={pathname === "/followers" ? "active" : ""}>
                    <img src="/followers.svg" alt="Followers" className="sidebar-icon" />
                </Link>
                <Link to="/ai" className={pathname === "/ai" ? "active" : ""}>
                    <img src="/ai.svg" alt="AI" className="sidebar-icon" />
                </Link>
            </nav>
        </aside>
    );
};

export default Sidebar;