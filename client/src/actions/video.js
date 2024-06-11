import * as api from "../api";

export const uploadVideo = (videoData) => async (dispatch) => {
  try {
    const { fileData, fileOptions } = videoData;
    const data = await api.uploadVideo(fileData, fileOptions);
    dispatch({ type: "POST_VIDEO", data });
    dispatch(getVideos());
  } catch (error) {
    alert(error.response.data.message);
  }
};

export const getVideos = () => async (dispatch) => {
  try {
    const { data } = await api.getAllVideos();
    dispatch({ type: "FETCH_ALL_VIDEOS", payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const likeVideo = (LikeData) => async (dispatch) => {
  try {
    const { id, Like } = LikeData;
    const { data } = await api.likeVideo(id, Like);
    dispatch({ type: "POST_LIKE", payload: data });
    dispatch(getVideos());
  } catch (error) {
    console.log(error);
  }
};

export const viewVideo = (ViewData) => async (dispatch) => {
  try {
    const { id } = ViewData;
    const { data } = await api.viewsVideo(id);
    dispatch({ type: "POST_VIEWS", payload: data });
    dispatch(getVideos());
  } catch (error) {
    console.log(error);
  }
};

export const watchVideo = (watchData) => async (dispatch) => {
  const { userId, videoId } = watchData;

  try {
    const data = await api.watchVideo(userId, videoId);
    dispatch({ type: "WATCH_VIDEO", payload: data });
  } catch (error) {
    console.log(error);
  }
};
