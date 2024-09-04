import { useState } from "react";
import { postService } from "../services/post.service.js";

export function PostFilter() {
    const [filterByToEdit, setFilterByToEdit] = useState(postService.getDefaultFilter)

    console.log(filterByToEdit);


    function handelChange(ev) {
        let { value, name: field, type } = ev.target
        value = type === 'number' ? +value : value
        setFilterByToEdit(prevFilter => {
            return { ...prevFilter, [field]: value }
        })
    }

    return <section className="post-filter">
        <h2>search:</h2>
        <form >
            <input type="text" placeholder="Text" name='txt'
                value={filterByToEdit.txt}
                onChange={handelChange}></input>

            <input type="number" placeholder="Likes" name='like'
                value={filterByToEdit.like}
                onChange={handelChange}></input>

            <input type="text" placeholder="By use" name='byUser'
                value={filterByToEdit.byUser}
                onChange={handelChange}></input>
        </form>
    </section>
}