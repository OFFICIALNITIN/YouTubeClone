import axios from "axios";
const API = axios.create({
  baseURL: `http://localhost:8000`,
});
API.interceptors.request.use((req) => {
  if (localStorage.getItem("Profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("Profile")).token
    }`;
  }
  return req;
});

export const login = (authData) => API.post("/user/login", authData);

export const updateChannelData = (id, updateData) =>
  API.patch(`/user/update/${id}`, updateData);

export const fetchAllChannel = () => API.get("/user/getAllChannels");

export const uploadVideo = (fileData, fileOptions) =>
  API.post("/video/uploadVideo", fileData, fileOptions);

export const getAllVideos = () => API.get("/video/getvideos");

export const likeVideo = (id, Like) => API.patch(`/video/like/${id}`, { Like });

export const viewsVideo = (id) => API.patch(`/video/view/${id}`);

export const addToLikedVideo = (likedVideoData) =>
  API.post("/video/likedvideo", likedVideoData);

export const getAllLikedVideos = () => API.get("/video/getAlllikeVideo");

export const deleteLikedVideos = (videoId, Viewer) =>
  API.delete(`/video/deletelikeVideo/${videoId}/${Viewer}`);

export const addToWatchLater = (watchLaterData) =>
  API.post("/video/watchLater", watchLaterData);

export const getAllWatchLater = () => API.get("/video/getAllwatchLaterVideo");

export const deleteWatchLater = (videoId, Viewer) =>
  API.delete(`/video/deleteWatchHistory/${videoId}/${Viewer}`);

export const addToHistory = (HistoryData) =>
  API.post("/video/history", HistoryData);

export const getAllHistory = () => API.get("/video/getAllhistoryVideo");

export const deleteHistory = (userId) =>
  API.delete(`/video/deletehistory/${userId}`);

export const postComment = (CommentData) =>
  API.post("/comment/post", CommentData);

export const deleteComment = (id) => API.delete(`/comment/delete/${id}`);

export const updateComment = (id, commentBody) =>
  API.patch(`/comment/update/${id}`, { commentBody });

export const getAllComment = () => API.get("/comment/get");

export const watchVideo = (userId, videoId) =>
  API.post("/video/watch-video", { userId, videoId });

export const points = (userId) => API.get(`/video/points/${userId}`);
