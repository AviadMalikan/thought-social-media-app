import { useState, useEffect } from "react"
import { postService } from "../services/post.service.js"
import { PostList } from "../cmps/post-list.jsx"


export function PostIndex() {
    const [posts, setPost] = useState([])
    const [currPost, setCurrPost] = useState(null)

    useEffect(() => { loadPosts() }, [])

    function loadPosts() {
        postService.query().then(setPost)
    }

    return <section className="post-index">
        <PostList posts={posts} />
    </section>
}