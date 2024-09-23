import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { PostPreview } from "./post-preview.jsx";
import { postService } from "../services/post.service.js";
import { AddComments } from "./add-comments.jsx";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";

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

    function onSaveComment(comment) {
        // setPost(prevPost => ({
        //     ...prevPost, metics: { ...prevPost.metics, comments:[...prevPost.metics.comments,comment] }
        // }))      
        const newPost = { ...post, metics: { ...post.metics, comments: [...post.metics.comments, comment] } }

        postService.save(newPost)
            .then(post => {
                setPost(post)
                showSuccessMsg('Comment add')
            })
            .catch(err => { showErrorMsg() })
    }

    if (!post) return <h1>Loading...</h1>
    return <div className="post-details">
        <button onClick={onGoBack}>Go BACK</button>
        <button onClick={() => { console.log(post) }}>Log</button>
        <PostPreview postToShow={postToShow} post={post} isPostDetails={true} />
        <AddComments onSaveComment={onSaveComment} />

    </div >
}