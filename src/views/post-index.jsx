import { useState, useEffect } from "react"



export function PostIndex() {

    const [posts, setPost] = useState([])

    useEffect(() => { loadPosts }, [])

    function loadPosts() {

    }

    return <section className="post-index">
        <h2>Hello from PostIndex</h2>
    </section>
}