import { useEffect, useRef, useState } from "react"
import { postService } from "../services/post.service";
import { Link, useNavigate, useParams } from "react-router-dom";
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";

export function PostEdit() {
    const [postToEdit, setPostToEdit] = useState(postService.getEmptyPost())
    const navigate = useNavigate()
    const { postId } = useParams()

    useEffect(() => {
        if (!postId) return
        loadPost()
    }, [])

    function loadPost() {
        postService.get(postId)
            .then(setPostToEdit)
            .catch(err => {
                console.log('Had Issue with:', err);
                navigate('/posts')
            })
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setPostToEdit(prevPost => ({
            ...prevPost,
            content: {
                ...prevPost.content,
                [field]: value
            }
        }))
    }

    function onSavePost(ev) {
        ev.preventDefault()
        const msg = postToEdit.id ? ' Saved' : 'Uploaded'
        postService.save(postToEdit)
            .then(post => {
                navigate("/posts")
                showSuccessMsg(`Your post has been ${msg}`)
            })
            .catch(showErrorMsg)
    }

    return <section className="car-edit">
        <form onSubmit={onSavePost}>
            <Link to="/posts">X</Link>
            <input
                type="text"
                name="text"
                id="text"
                value={postToEdit.content.text}
                onChange={handleChange}
                placeholder="Share your though"
            />

            <button>{postToEdit.id ? 'Save' : 'Add'}</button>
        </form>
    </section>
}





// export function PostEdit({ onEditPost }) {
//     const [postToEdit, setPostToEdit] = useState(postService.getEmptyPost())

//     // const [text, setText] = useState('')
//     const textareaRef = useRef(null);

//     useEffect(() => {
//         adjustHeight();
//     }, [postToEdit]);

//     function handelChange({ target }) {
//         if (!target) return
//         let { value, name: field, type } = target
//         value = type === 'number' ? +value : value
//         setPostToEdit(prevPost => (
//             {
//                 ...prevPost,
//                 content: {
//                     ...prevPost.content,
//                     [field]: value
//                 }
//             }
//         ))
//     }

//     function onSubmitPost(ev) {
//         ev.preventDefault()
//         console.log(postToEdit);
//         // onAddPost(filterByToEdit)
//     }

//     const adjustHeight = () => {
//         const elTextarea = textareaRef.current;
//         if (elTextarea) {
//             elTextarea.style.height = 'auto'; // Reset the height to auto to calculate the correct scroll height
//             elTextarea.style.height = elTextarea.scrollHeight + 'px'; // Set the height to match the scroll height
//         }
//     }

//     return <section className="post-add">
//         <form onSubmit={onSubmitPost}>
//             <textarea type="text" placeholder="Share yours thought" name='text'
//                 onChange={handelChange} ref={textareaRef}
//             ></textarea>
//             <button>Submit</button>
//         </form>
//     </section>
// }
