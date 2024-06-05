import express from "express";
import { uploadVideo, getAllVideos } from "../controllers/video.js";
import { likeController } from "../controllers/like.js";
import { viewController } from "../controllers/view.js";
import auth from "../middleware/auth.js";

import {
  likeVideoController,
  getAllLikeVideoController,
  deleteLikeVideoController,
} from "../controllers/likeVideo.js";
import {
  watchLaterController,
  getAllwatchLaterController,
  deletewatchLaterController,
} from "../controllers/wacthLater.js";
import {
  historyController,
  getAllhistoryController,
  deletehistoryController,
} from "../controllers/history.js";
import upload from "../Helpers/fileHelpers.js";

const routes = express.Router();

routes.post("/uploadVideo", auth, upload.single("file"), uploadVideo);
routes.get("/getvideos", getAllVideos);
routes.patch("/like/:id", likeController);
routes.patch("/view/:id", viewController);

routes.post("/likedvideo", auth, likeVideoController);
routes.get("/getAlllikeVideo", getAllLikeVideoController);
routes.delete(
  "/deletelikeVideo/:videoId/:Viewer",
  auth,
  deleteLikeVideoController
);

routes.post("/watchLater", auth, watchLaterController);
routes.get("/getAllwatchLaterVideo", getAllwatchLaterController);
routes.delete(
  "/deleteWatchHistory/:videoId/:Viewer",
  auth,
  deletewatchLaterController
);

routes.post("/history", auth, historyController);
routes.get("/getAllhistoryVideo", getAllhistoryController);
routes.delete("/deletehistory/:userId", auth, deletehistoryController);

export default routes;
