// src/App.tsx
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DMPage from "./pages/DMPage";
import UserProfile from "./pages/UserProfile";
import PostPage from "./pages/PostPage";
import Sidebar from "./layout/Sidebar";
import "./style.css";

export default function App() {
    return (
        <div className="app-container">
            <Sidebar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/dm" element={<DMPage />} />
                <Route path="/user/:id" element={<UserProfile />} />
                <Route path="/post/:id" element={<PostPage />} />
            </Routes>
        </div>
    );
}