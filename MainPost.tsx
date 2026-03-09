import React from 'react';
import './MainPost.css';

type Post = {
  title: string
  content?: string
  image?: string
}

type Props = {
  post: Post
}

const MainPost = ({ post }: Props) => {
    return (
        <div className="main-post">
            <h1>{post.title}</h1>
            <p>{post.content}</p>
        </div>
    );
};

export default MainPost;
