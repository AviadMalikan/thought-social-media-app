// import { CommentPreview } from "../comment-preview"

import { Link } from "react-router-dom"
import { utilService } from "../../services/util.service"
import { CommentList } from "./comments-list"
import { LongTxt } from "../long-txt"

export function CommentPreview({ comment, onRemoveComment, }) {

    function onToggleLike() {
        return
    }

    function onSelectComment() { }

    return <article className="comment-preview">
        <div className="userImg">
            <img
                src={comment.author.img ? comment.author.img : `https://robohash.org/${comment.author.userName}`}
                alt={`${comment.author.userName} img`} />
        </div>

        <section className="comment-header">
            <div className="comment-meta">
                <span className="by-user">{comment.author.userName} </span>
                <span onClick={() => onSelectComment(comment.id)}
                    className="comment-date pointer">{utilService.showTimeTxt(comment.date)}</span>
            </div>
            <span onClick={() => onRemoveComment(comment.id)} className="remove-btn pointer">X</span>
        </section>

        <section className="comment-content">
            <p className="comment-text" onClick={() => onSelectComment(comment.id)}>{<LongTxt txt={comment.content.text} length={50} />}</p>
            <div className="comment-data">
                <div className="comment-btn">
                    <span className="like"
                        onClick={() => onToggleLike()}
                    >{comment.isLiked ? '♥' : '♡'} {comment.metics.likes}</span>
                </div>
                {(comment.metics.comments) &&
                    <div className="comment-btn" onClick={() => onSelectComment(comment.id)}>
                        <span className="commend">🗨️ {comment.metics.comments.length}</span>
                    </div>}
                <div className="comment-btn">
                    <span className="share">↑ {(comment.metics.share) && comment.metics.share}</span>
                </div>
            </div>
        </section>

    </article >


    return <CommentPreview comment={comment} />
}