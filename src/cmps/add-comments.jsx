import { useState } from "react"
import { postService } from "../services/post.service"



export function AddComments({ onSaveComment }) {
    const [commentToPost, setCommentToPost] = useState(postService.getEmptyComment())

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setCommentToPost(prevComment => ({
            ...prevComment, [field]: value
        }))
    }

    function onSubmitComment(ev) {
        ev.preventDefault()
        if (!commentToPost.text || !commentToPost.userName) return
        onSaveComment(commentToPost)
        onRemoveLine('text')
        onRemoveLine('userName')
    }

    function onRemoveLine(type) {
        setCommentToPost(prevComment => ({
            ...prevComment, [type]: ''
        }))
    }

    return <section className="add-comments">
        <section className="add-comment">
            <form onSubmit={onSubmitComment}>
                <input
                    autoComplete="off"
                    type="text"
                    name="userName"
                    id="userName"
                    value={commentToPost.userName}
                    onChange={handleChange}
                    placeholder="Write your comment as"
                />
                <label onClick={() => onRemoveLine('userName')} className="remove-comment-text">X</label>

                <input
                    autoComplete="off"
                    type="text"
                    name="text"
                    id="text"
                    value={commentToPost.text}
                    onChange={handleChange}
                    placeholder="Your comment"
                />
                <label onClick={() => onRemoveLine('text')} className="remove-comment-text">X</label>

                <button >Add</button>
            </form>
        </section>
    </section >
}