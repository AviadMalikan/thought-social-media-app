import { useEffect, useRef, useState } from "react"
import { postService } from "../services/post.service"
import { utilService } from "../services/util.service"


export function AddComments({ onSaveComment }) {
    const [commentToPost, setCommentToPost] = useState(postService.getEmptyComment())
    const textareaRef = useRef(null);

    useEffect(() => {
        adjustHeight();
    }, [commentToPost.content.text]);


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

    const adjustHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto'; // Reset the height to auto to calculate the correct scroll height
            textarea.style.height = textarea.scrollHeight + 'px'; // Set the height to match the scroll height
        }
    };

    return <section className="add-comments">
        <form onSubmit={onSubmitComment} className="comment-form">
            <textarea
                ref={textareaRef}
                value={commentToPost.content.text}
                name="text"
                id="text"
                onChange={handleChange}
                rows={1}  // Set initial row count, this can be adjusted as needed
                style={{ resize: 'none', overflow: 'hidden' }}
                placeholder="Type something..."
            />




            {/* <input
                autoComplete="off"
                type="text"
                name="text"
                id="text"
                value={commentToPost.content.text}
                onChange={handleChange}
                placeholder="Your comment"
            /> */}

            <button >Add</button>
        </form>
    </section >
}