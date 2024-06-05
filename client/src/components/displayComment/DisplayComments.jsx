import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../comments/comment.css";
import { deleteComment, updateComment } from "../../actions/comment";
import moment from "moment";

function DisplayComments({
  cid,
  commentBody,
  userCommented,
  userId,
  commentOn,
}) {
  const [Edit, setEdit] = useState(false);
  const [cmtBdy, setCmtBdy] = useState(false);
  const [cmtId, setcmtId] = useState();
  const CurrentUser = useSelector((state) => state.currentUserReducer);

  const dispatch = useDispatch();

  const handleEdit = (ctId, ctBdy) => {
    setEdit(true);
    setCmtBdy(ctBdy);
    setcmtId(ctId);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!cmtBdy) {
      alert("Type Your Comment");
    } else {
      dispatch(
        updateComment({
          id: cmtId,
          commentBody: cmtBdy,
        })
      );
      setCmtBdy("");
    }
    setEdit(false);
  };
  const handleDelete = (id) => {
    dispatch(deleteComment(id));
  };
  return (
    <>
      {Edit ? (
        <>
          <form
            className="comments_sub_form_comments"
            onSubmit={handleOnSubmit}
          >
            <input
              type="text"
              placeholder="Edit comment..."
              className="comment_ibox"
              onChange={(e) => setCmtBdy(e.target.value)}
              value={cmtBdy}
            />
            <input
              type="submit"
              value="Change"
              className="comments_add_btn_comments"
            />
          </form>
        </>
      ) : (
        <p className="comment_bdody">{commentBody}</p>
      )}
      <p className="usercommented">
        {" "}
        - {userCommented} commented {moment(commentOn).fromNow()}
      </p>
      {CurrentUser?.result._id === userId && (
        <p className="EditDel_DisplayComment">
          <i onClick={(e) => handleEdit(cid, commentBody)}>Edit</i>
          <i onClick={(e) => handleDelete(cid)}>Delete</i>
        </p>
      )}
    </>
  );
}

export default DisplayComments;
