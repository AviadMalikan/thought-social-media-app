import { LongTxt } from "./long-txt.jsx";
import { utilService } from "../services/util.service.js"
import { Link, useNavigate } from "react-router-dom";


export function PostPreview({ post, onRemovePost, postToShow }) {
    const navigate = useNavigate()

    console.log('post', post);

    function onSelectPost(postId) {
        navigate(`/posts/${postId}`)
    }

    const imgUser = post.author.img ? post.author.img : `https://robohash.org/${post.author.userName}`
    return <article className="post-preview">
        <div className="userImg">
            <img
                src={imgUser}
                alt={`${post.author.userName} img`} />
        </div>

        <section className="post-header">
            <div className="post-details">
                <span className="by-user">{post.author.userName}</span>
                <span onClick={() => onSelectPost(post.id)}
                    className="post-date pointer">{utilService.showTimeTxt(post.date)}</span>
            </div>
            <div title="remove" className="post-utils pointer" onClick={() => onRemovePost(post.id)}>•••</div>
            <Link to={`/posts/edit/${post.id}`}>
                <div title="edit" className="post-utils pointer" >✏️</div>
            </Link>
        </section>

        <section className="post-content">
            <p className="post-text" onClick={() => onSelectPost(post.id)}>{<LongTxt txt={post.content.text} length={50} />}</p>
            <div className="post-data">
                <div className="post-btn">
                    <span className="like">{post.isLiked ? '♥' : '♡'} {post.metics.likes}</span>
                </div>
                <div className="post-btn">
                    <span className="commend">🗨️ {post.metics.comments}</span>
                </div>
                <div className="post-btn">
                    <span className="share">↑ {post.metics.share}</span>
                </div>
            </div>
        </section>
    </article>


    return <article className="post-preview">
        <section className="post-header flex">
            <div className="flex">
                <img src={`https://robohash.org/${post.byUser}`} alt={`${post.byUser} img`} />
                <div className="post-details">
                    <h4>{post.byUser}</h4>
                    <h6 onClick={() => onSelectPost(post.id)}
                        className="pointer">{utilService.showTimeTxt(post.date)}</h6>
                </div>
            </div>
        </section>
        <section className="post-content flex">
            <div className="likes-details">
                {/* <h5 className="pointer">{post.isLiked ? '❤️' : '🖤'}</h5> */}
            </div>
        </section>
    </article>
}