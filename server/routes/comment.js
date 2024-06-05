import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";
import {
  postComment,
  deleteComment,
  updateComment,
  getComments,
} from "../controllers/comment.js";

router.post("/post", auth, postComment);
router.delete("/delete/:id", auth, deleteComment);
router.patch("/update/:id", auth, updateComment);
router.get("/get", getComments);

export default router;
