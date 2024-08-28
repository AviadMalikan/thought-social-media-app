import { LongTxt } from "./long-txt.jsx";

export function PostPreview({ post, onSelectPost, postToShow }) {

    console.log(postToShow);

    return <article className="post-preview">
        <section className="post-header flex">
            <div className="flex">
                <img src={`https://robohash.org/${post.byUser}`} alt={`${post.byUser} img`} />
                <div className="post-details">
                    <h4>{post.byUser}</h4>
                    <h6 onClick={() => onSelectPost(post.id)}
                        className="pointer">{post.date}</h6>
                </div>
            </div>
            {!postToShow && <button>x</button>}
            {postToShow && <button>Edit</button>}
        </section>
        <section className="post-content flex">
            <p>{<LongTxt txt={post.txt} length={50} />}</p>
            <div className="likes-details">
                <h5 className="pointer">{post.isLiked ? '❤️' : '🖤'}</h5>
                <h5>{post.likes}</h5>
            </div>
        </section>
    </article>
}