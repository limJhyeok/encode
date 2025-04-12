// src/pages/PostPage.tsx
import React from "react";
import { useParams } from "react-router-dom";
import PostView from "./posts/PostView";
import Header from "../layout/Header";
import "../style.css";

const PostPage = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <div className="main-content">
            <Header />
            <PostView postId={id || ""} />
        </div>
    );
};

export default PostPage;