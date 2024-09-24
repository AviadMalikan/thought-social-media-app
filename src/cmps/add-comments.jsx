import { useState } from "react"
import { postService } from "../services/post.service"
import { utilService } from "../services/util.service"


export function AddComments({ onSaveComment }) {
    const [commentToPost, setCommentToPost] = useState(postService.getEmptyComment())

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setCommentToPost(prevComment => ({
            ...prevComment, content: {
                ...prevComment.content,
                [field]: value
            }
        }))
    }

    function onSubmitComment(ev) {
        ev.preventDefault()
        // if (!commentToPost.text || !commentToPost.userName) return
        commentToPost.id = utilService.makeId()
        commentToPost.date = new Date()
        onSaveComment(commentToPost)
        setCommentToPost(prevPost => postService.getEmptyComment())
    }


    return <section className="add-comments">
        <section className="add-comment">
            <form onSubmit={onSubmitComment}>
                {/* <input
                    autoComplete="off"
                    type="text"
                    name="userName"
                    id="userName"
                    value={commentToPost.userName}
                    onChange={handleChange}
                    placeholder="Write your comment as"
                />
                <label onClick={() => onRemoveLine('userName')} className="remove-comment-text">X</label> */}

                <input
                    autoComplete="off"
                    type="text"
                    name="text"
                    id="text"
                    value={commentToPost.content.text}
                    onChange={handleChange}
                    placeholder="Your comment"
                />

                <button >Add</button>
            </form>
        </section>
    </section >
}