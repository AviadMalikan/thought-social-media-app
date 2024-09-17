import { useState, useEffect } from "react"
import { postService } from "../services/post.service.js"
import { PostList } from "../cmps/post-list.jsx"
import { PostDetails } from "../cmps/post-details.jsx"
import { PostFilter } from "../cmps/post-filter.jsx"
import { PostAdd } from "../cmps/post-add.jsx"


export function PostIndex({ showMsg }) {
    const [posts, setPost] = useState([])
    const [postToShow, setPostToShow] = useState(null)
    const [filterBy, setFilterBy] = useState(postService.getDefaultFilter)

    useEffect(() => { loadPosts() }, [filterBy])

    function loadPosts() {
        postService.query(filterBy).then(setPost)
    }

    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }

    function onSelectPost(postId) {
        if (postToShow && postId === postToShow.id) return
        postService.get(postId).then(setPostToShow)
    }

    function onRemovePost(postId) {
        postService.remove(postId).then(() => {
            const updatedPost = posts.filter(p => p.id !== postId)
            setPost(updatedPost)
            showMsg('', true, `Post ${postId} has been removed`)
        })
    }

    function onEditPost() {
        console.log('Added');

    }

    return <section className="post-index">
        <PostAdd onEditPost={onEditPost} />
        {/* <PostFilter onSetFilter={onSetFilter} /> */}
        {
            (!postToShow) && <PostList posts={posts}
                onSelectPost={onSelectPost}
                onRemovePost={onRemovePost} />
        }
        {
            postToShow && <PostDetails post={postToShow}
                onSelectPost={onSelectPost}
                postToShow={postToShow}
                onGoBack={() => setPostToShow(null)} />
        }
    </section >

}