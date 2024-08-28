import { useState, useEffect } from "react"
import { postService } from "../services/post.service.js"
import { PostList } from "../cmps/post-list.jsx"
import { PostDetails } from "../cmps/post-details.jsx"


export function PostIndex() {
    const [posts, setPost] = useState([])
    // const [selectedPost, setSelectedPost] = useState(null)
    const [postToShow, setPostToShow] = useState(null)

    useEffect(() => { loadPosts() }, [])

    function loadPosts() {
        postService.query().then(setPost)
    }


    function onSelectPost(postId) {
        if (postToShow && postId === postToShow.id) return
        postService.get(postId).then(setPostToShow)
    }

    return <section className="post-index">
        {
            (!postToShow) && <PostList posts={posts}
                onSelectPost={onSelectPost} />
        }
        {
            postToShow && <PostDetails post={postToShow}
                onSelectPost={onSelectPost}
                postToShow={postToShow}
                onGoBack={() => setPostToShow(null)} />
        }
    </section >

}