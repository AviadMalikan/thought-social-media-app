import { useState } from "react";
import { postService } from "../services/post.service.js";

export function PostFilter({ onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(postService.getDefaultFilter)

    function handelChange(ev) {
        let { value, name: field, type } = ev.target
        value = type === 'number' ? +value : value
        setFilterByToEdit(prevFilter => {
            return { ...prevFilter, [field]: value }
        })
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    return <section className="post-filter">
        <h2>search:</h2>
        <form onSubmit={onSubmitFilter}>
            <input type="text" placeholder="Text" name='txt'
                value={filterByToEdit.txt}
                onChange={handelChange}></input>

            <input type="number" placeholder="Likes" name='likes'
                value={filterByToEdit.likes}
                onChange={handelChange}></input>

            <input type="text" placeholder="By use" name='byUser'
                value={filterByToEdit.byUser}
                onChange={handelChange}></input>
            <button>Filter</button>
        </form>
    </section>
}