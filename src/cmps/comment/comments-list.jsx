import { CommentPreview } from "./comments-preview";
import { PostPreview } from "../post-preview";

export function CommentList({ comments }) {

    // if (!comments.length) return <h6>No comments yet. be the first one!</h6>
    return <ul className="comments-list">
        {comments.map(c => <li key={c.id}>
            <PostPreview post={c} />
        </li>)}
    </ul>
}