import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { PostPreview } from "./post-preview.jsx";
import { postService } from "../services/post.service.js";
import { AddComments } from "./add-comments.jsx";

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
        setPost(({ metics, ...prevPost }) =>
            ({ ...prevPost, metics: { ...metics, comments: [...metics.comments, comment] } })
        )

    }

    if (!post) return <h1>Loading...</h1>
    return <div className="post-details">
        <button onClick={onGoBack}>Go BACK</button>
        <button onClick={() => { console.log(post) }}>Log</button>
        <PostPreview postToShow={postToShow} post={post} />
        <AddComments onSaveComment={onSaveComment} />

    </div >
}