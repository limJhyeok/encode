import React from "react";
import { useParams } from "react-router-dom";
import PostView from "./posts/PostView";

const PostPage = () => {
    const { id } = useParams<{ id: string }>();

    return <PostView postId={id || ""} />;
};

export default PostPage;
