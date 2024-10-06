import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { PostPreview } from "./post-preview.jsx";
import { postService } from "../services/post.service.js";
import { AddComments } from "./add-comments.jsx";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js";
import { CommentList } from "./comment/comments-list.jsx";

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

    function onSaveComment(comment) {
        postService.saveReview(post.id, comment)
            .then(p => {
                setPost(p)
                showSuccessMsg('Comment add')
            })
            .catch(err => { showErrorMsg() })
    }

    function onRemoveComment(commentId) {
        postService.removeComment(post.id, commentId)
            .then(post => {
                console.log('post: ', post)

                setPost(post)
                showSuccessMsg('Comment Removed')
            })
            .catch(err => { showErrorMsg() })
    }


    if (!post) return <h1>Loading...</h1>
    return <div className="post-details">
        <button onClick={onGoBack} className="close-btn pointer">{'<'}</button>
        {/* <div className="post-details-bg"></div> */}
        <PostPreview
            onRemoveComment={onRemoveComment}
            postToShow={postToShow}
            post={post} isPostDetails={true} />
        <section className="post-comments">
            <CommentList comments={post.metics.comments} onRemoveComment={onRemoveComment} />
        </section>
        <AddComments onSaveComment={onSaveComment} />
    </div >
}