// src/pages/UserProfile.tsx
import React from "react";
import { useParams } from "react-router-dom";
import Header from "../layout/Header";
import "../style.css";

const UserProfile = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <div className="main-content">
            <Header />
            <div className="page-container">
                <h2>User Profile: {id}</h2>
                <p>This is a placeholder for the user profile page.</p>
            </div>
        </div>
    );
};

export default UserProfile;