
export function PostPreview({ post }) {
    console.log(post);

    return <article className="post-preview">
        <section className="post-details flex">
            <img src={`https://robohash.org/${post.byUser}`} alt={`${post.byUser} img`} />
            <div>
                <h4>{post.byUser}</h4>
                <h6>{post.date}</h6>
            </div>
        </section>
        <section className="post-content flex">
            <p>{post.title}</p>
            <div className="likes-details">
                <h5>{post.isLiked ? '❤️' : '🖤'}</h5>
                <h5>{post.likes}</h5>
            </div>
        </section>
    </article>
}