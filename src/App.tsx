import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserProfile from "./pages/UserProfile";
import PostPage from "./pages/PostPage"; // ✅ wrapper handles postId

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/user/:id" element={<UserProfile />} />
            <Route path="/post/:id" element={<PostPage />} /> {/* ✅ fixed */}
        </Routes>
    );
}

export default App;
