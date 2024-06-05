import * as api from "../api";

export const postComment = (CommentData) => async (dispatch) => {
  try {
    const { data } = await api.postComment(CommentData);
    dispatch({ type: "POST_COMMENT", payload: data });
    dispatch(getAllComment());
  } catch (error) {
    console.log(error);
  }
};

export const getAllComment = () => async (dispatch) => {
  try {
    const { data } = await api.getAllComment();

    dispatch({ type: "FETCH_ALL_COMMENT", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = (CommentData) => async (dispatch) => {
  try {
    const id = CommentData;
    console.log(id);
    await api.deleteComment(id);
    dispatch(getAllComment());
  } catch (error) {
    console.log(error);
  }
};

export const updateComment = (CommentData) => async (dispatch) => {
  try {
    const { id, commentBody } = CommentData;
    console.log(commentBody);
    const { data } = await api.updateComment(id, commentBody);
    dispatch({ type: "UPDATE_COMMENT", payload: data });
    dispatch(getAllComment());
  } catch (error) {
    console.log(error);
  }
};
