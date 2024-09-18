import { useState, useEffect } from "react"
import { postService } from "../services/post.service.js"
import { PostList } from "../cmps/post-list.jsx"
import { PostDetails } from "../cmps/post-details.jsx"
import { PostFilter } from "../cmps/post-filter.jsx"
import { PostEdit } from "../cmps/post-edit.jsx"
import { Link } from "react-router-dom"
import { eventBusService, showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"


export function PostIndex({ showMsg }) {
    const [posts, setPost] = useState([])
    const [postToShow, setPostToShow] = useState(null)
    const [filterBy, setFilterBy] = useState(postService.getDefaultFilter)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        loadPosts()
        setIsLoading(true)
    }, [filterBy])

    function loadPosts() {
        postService.query(filterBy).then((posts) => {
            setPost(posts)
            setIsLoading(false)
        })
    }

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    function onSelectPost(postId) {
        if (postToShow && postId === postToShow.id) return
        postService.get(postId).then(setPostToShow)
    }

    function onRemovePost(postId) {
        postService.remove(postId)
            .then(() => {
                const updatedPost = posts.filter(p => p.id !== postId)
                setPost(updatedPost)
                showSuccessMsg('Post Remove Successfully')
            })
            .catch(() => {
                showErrorMsg()
            })
    }


    return <section className="post-index">
        <Link to="/posts/edit">
            <button>Add Post</button>
        </Link>
        {/* <PostEdit onEditPost={onEditPost} /> */}
        {/* <PostFilter onSetFilter={onSetFilter} /> */}
        {
            (!isLoading) && <PostList posts={posts}
                onSelectPost={onSelectPost}
                onRemovePost={onRemovePost} />
        }
        {isLoading && <h3>LOADING...</h3>}
        {(!posts.length && !isLoading) && <h3>No thought yes, share yours.</h3>}
    </section >

}