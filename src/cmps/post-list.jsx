import { PostPreview } from "./post-preview.jsx"


export function PostList({ posts, onSelectPost }) {


    if (!posts) return <h2>loading...</h2>
    return <ul className="post-list">
        {posts.map(p => <li key={p.id}>
            <PostPreview post={p} onSelectPost={onSelectPost}/>
        </li>)}
    </ul>
}