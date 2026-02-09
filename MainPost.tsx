import React from 'react';
import './MainPost.css';

const MainPost = ({ post }) => {
    return (
        <div className="main-post">
            <h1>{post.title}</h1>
            <p>{post.content}</p>
        </div>
    );
};

export default MainPost;