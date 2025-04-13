import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DMPage from "./pages/DMPage";
import UserProfile from "./pages/UserProfile";
import PostPage from "./pages/PostPage";
import FollowersPage from "./pages/FollowersPage";
import Sidebar from "./layout/Sidebar";
import Header from "./layout/Header"; // 🆕 Add this
import { ConnectButton } from "@rainbow-me/rainbowkit";
import "./style.css";

export default function App() {
    return (
        <div className="app-container">
            {/* Sidebar stays on the left */}
            <Sidebar />

            {/* Main area: everything on the right */}
            <div className="main-content">
                {/* Header at top of all pages */}
                <Header />

                {/* Top right connect button */}
                <div className="wallet-button-container">
                    <ConnectButton />
                </div>

                {/* Page routes below header */}
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/dm" element={<DMPage />} />
                    <Route path="/user/:id" element={<UserProfile />} />
                    <Route path="/post/:id" element={<PostPage />} />
                    <Route path="/followers" element={<FollowersPage />} />
                </Routes>
            </div>
        </div>
    );
}
