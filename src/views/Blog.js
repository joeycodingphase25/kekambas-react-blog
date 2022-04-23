import React, { useState, useEffect } from 'react'
import PostCard from '../components/PostCard';

export default function Blog(props) {
    const [posts, setPosts] = useState([]);


    useEffect(() => {
        fetch('https://kekambas-blog.herokuapp.com//blog/posts', {
            method: 'GET'
        })
            .then(res => res.json())
            .then(data => setPosts(data))
    }, [])

    
    return (
        <>
            <h1 className='text-center'>Kekambas Blog</h1>
            <hr></hr>
            {posts.map(p => <PostCard post={p} key={p.id} />)}
        </>
    )





}