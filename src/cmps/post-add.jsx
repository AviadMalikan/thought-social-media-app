import { useEffect, useRef, useState } from "react"

export function PostAdd({ onEditPost }) {

    const [text, setText] = useState('')
    const textareaRef = useRef(null);

    useEffect(() => {
        adjustHeight();
    }, [text]);

    function handelChange(ev) {
        let { value, name: field, type } = ev.target
        value = type === 'number' ? +value : value
        setText(prevText => value)
    }
    function onSubmitPost(ev) {
        ev.preventDefault()
        console.log(text);

        // onAddPost(filterByToEdit)
    }

    const adjustHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto'; // Reset the height to auto to calculate the correct scroll height
            textarea.style.height = textarea.scrollHeight + 'px'; // Set the height to match the scroll height
            console.log('adjustHeight');

        }
    }

    return <section className="post-add">
        <form onSubmit={onSubmitPost}>
            <textarea type="text" placeholder="Share yours thought" name='txt'
                onChange={handelChange} ref={textareaRef}
            ></textarea>
        </form>
    </section>
}
