import { Link, useLocation } from "react-router-dom";
import "../style.css";
import logo from "../assets/zora-icon.png";

const Sidebar = () => {
    const { pathname } = useLocation();

    return (
        <aside className="zora-sidebar">
            <Link to="/" className="sidebar-logo">
                <img src={logo} alt="Logo" />
            </Link>
            <nav className="sidebar-links">
                <Link to="/" className={pathname === "/" ? "active" : ""}>🏠</Link>
                <Link to="/dm" className={pathname === "/dm" ? "active" : ""}>💬</Link>
                <Link to="/followers" className={pathname === "/followers" ? "active" : ""}>👥</Link>
                <Link to="/ai" className={pathname === "/ai" ? "active" : ""}>🤖</Link>
            </nav>
        </aside>
    );
};

export default Sidebar;
