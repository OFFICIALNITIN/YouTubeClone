import React, { useState } from "react";
import "./comment.css";
import DisplayComments from "../displayComment/DisplayComments";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { postComment } from "../../actions/comment";

function Comments({ videoId }) {
  const [commentText, setCommentText] = useState("");

  const CurrentUser = useSelector((state) => state.currentUserReducer);

  const commentList = useSelector((state) => state.commentReducer);

  const dispatch = useDispatch();
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (CurrentUser) {
      if (!commentText) {
        alert("Please Type Your Comment");
      } else {
        dispatch(
          postComment({
            videoId: videoId,
            userId: CurrentUser?.result._id,
            commentBody: commentText,
            userCommented: CurrentUser?.result.name,
          })
        );
        setCommentText("");
      }
    } else {
      alert("Please Login to post your comments");
    }
  };
  return (
    <>
      <form className="comments_sub_form_comments" onSubmit={handleOnSubmit}>
        <input
          type="text"
          placeholder="add comment..."
          value={commentText}
          className="comment_ibox"
          onChange={(e) => setCommentText(e.target.value)}
        />
        <input
          type="submit"
          value="add"
          className="comments_add_btn_comments"
        />
      </form>
      <div className="display_comment_container">
        {commentList?.data
          ?.filter((q) => videoId === q?.videoId)
          .reverse()
          .map((m) => {
            return (
              <DisplayComments
                cid={m._id}
                userId={m.userId}
                commentBody={m.commentBody}
                commentOn={m.commentOn}
                userCommented={m.userCommented}
              />
            );
          })}
      </div>
    </>
  );
}

export default Comments;
