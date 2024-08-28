import { PostPreview } from "./post-preview.jsx";


export function PostDetails({ post, onSelectPost, onGoBack, postToShow }) {

    return <div className="post-details">
        <button onClick={onGoBack}>Go BACK</button>
        <PostPreview post={post} onSelectPost={onSelectPost} postToShow={postToShow} />
    </div>
}