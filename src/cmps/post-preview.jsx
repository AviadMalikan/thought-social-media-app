import { LongTxt } from "./long-txt.jsx";
import { utilService } from "../services/util.service.js"
import { Link, useNavigate } from "react-router-dom";
import { CommentList } from "./comment/comments-list.jsx";
import { postService } from "../services/post.service.js";


export function PostPreview({ post, onRemovePost, isPostDetails, }) {
    const navigate = useNavigate()

    function onToggleLike() {
    //     const newPost = { ...post, isLiked: !post.isLiked }
    //     console.log('post: ', post)
    //     console.log('newPost`: ', newPost)
        
    //     postService.save(newPost)
    }

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
            <div className="post-meta">
                <span className="by-user">{post.author.userName} </span>
                <span onClick={() => onSelectPost(post.id)}
                    className="post-date pointer">{utilService.showTimeTxt(post.date)}</span>
            </div>
            <Link to='/posts'>
                <span onClick={() => onRemovePost(post.id)} className="remove-btn pointer">X</span>
            </Link>
            {(isPostDetails) &&
                <div className="post-utils pointer" >
                    <Link to={`/posts/edit/${post.id}`}>
                        <span title="edit" className="edit-btn pointer" >✏️</span>
                    </Link>
                </div>}
        </section>

        <section className="post-content">
            <p className="post-text" onClick={() => onSelectPost(post.id)}>{<LongTxt txt={post.content.text} length={50} />}</p>
            <div className="post-data">
                <div className="post-btn">
                    <span className="like" onClick={() => onToggleLike()}
                    >{post.isLiked ? '♥' : '♡'} {post.metics.likes}</span>
                </div>
                {(post.metics.comments) &&
                    <div className="post-btn" onClick={() => onSelectPost(post.id)}>
                        <span className="commend">🗨️ {post.metics.comments.length}</span>
                    </div>}
                <div className="post-btn">
                    <span className="share">↑ {(post.metics.share) && post.metics.share}</span>
                </div>
            </div>
        </section>
        {(isPostDetails) && <section className="post-comments">
            <CommentList comments={post.metics.comments} onRemoveComment={onRemovePost} />
        </section>}
    </article >


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