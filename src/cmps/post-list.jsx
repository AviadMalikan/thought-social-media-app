import { PostPreview } from "./post-preview.jsx"


export function PostList({ posts, onSelectPost, onRemovePost }) {


    if (!posts) return <h2>loading...</h2>
    return <ul className="post-list">
        {posts.map(p => <li key={p.id}>
            <PostPreview post={p} 
            onRemovePost={onRemovePost}
            onSelectPost={onSelectPost} />
        </li>)}
    </ul>
}