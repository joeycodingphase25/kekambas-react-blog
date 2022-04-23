import React from 'react';
import { Link } from 'react-router-dom';

export default function PostCard(props) {
    const post = props.post
    return (
        <div className="card">
            <div className="card-body">
                <Link to={`/blog/${post.id}`}>
                    <h5 className="card-title">{post.title}</h5>
                </Link>
                <h6 className="card-subtitle mb-2 text-muted">By: {post.id}   Date: {post.date_created}</h6>
                <p className="card-text">{post.content}</p>
            </div>
        </div>
    )
}