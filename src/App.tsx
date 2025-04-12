// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UserProfile from './pages/UserProfile';

function App() {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/user/:id" element={<UserProfile />} />
        </Routes>
    );
}

export default App;
