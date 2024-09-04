import { LongTxt } from "./long-txt.jsx";
import { utilService } from "../services/util.service.js"

export function PostPreview({ post, onSelectPost, onRemovePost, postToShow }) {


    return <article className="post-preview">
        <div className="userImg">
            <img src={`https://robohash.org/${post.byUser}`} alt={`${post.byUser} img`} />
        </div>
        <section className="post-header">
            <div className="post-details">
                <span className="by-user">{post.byUser}</span>
                <span onClick={() => onSelectPost(post.id)}
                    className="post-date pointer">{utilService.showTimeTxt(post.date)}</span>
            </div>
            <div title="remove" className="post-utils pointer">•••</div>
        </section>
        <section className="post-content">
            <p className="post-text">{<LongTxt txt={post.txt} length={50} />}</p>
            <div className="post-data">
                <div className="post-btn">
                    <span className="like">{post.isLiked ? '♥' : '♡'} {post.likes}</span>
                </div>
                <div className="post-btn">
                    <span className="commend">🗨️</span>
                </div>
                <div className="post-btn">
                    <span className="share"> ↑</span>
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
            {!postToShow && <button onClick={() => onRemovePost(post.id)}>x</button>}
            {postToShow && <button>Edit</button>}
        </section>
        <section className="post-content flex">
            <div className="likes-details">
                {/* <h5 className="pointer">{post.isLiked ? '❤️' : '🖤'}</h5> */}
            </div>
        </section>
    </article>
}