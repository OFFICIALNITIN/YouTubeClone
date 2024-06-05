import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  videoId: String,
  userId: String,
  commentBody: String,
  userCommented: String,
  CommentOn: { type: Date, default: Date.now },
});

export default mongoose.model("comment", commentSchema);
