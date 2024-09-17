import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { PostPreview } from "./post-preview.jsx";
import { postService } from "../services/post.service.js";

export function PostDetails({ onGoBack, postToShow }) {
    const [post, setPost] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => { loadPost() }, [])

    function loadPost() {
        postService.get(params.postId)
            .then(setPost)
            .catch(err => {
                console.log('Hadd Issue with:', err);
                navigate('/posts')
            })
    }

    function onGoBack() {
        navigate('/posts')
    }
    console.log(post)

    if (!post) return <h1>Loading...</h1>
    return <div className="post-details">
        <button onClick={onGoBack}>Go BACK</button>
        <button onClick={() => console.log(post)}>Post details log</button>
        <PostPreview postToShow={postToShow} post={post} />
    </div >
}