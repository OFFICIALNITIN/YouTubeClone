import mongoose, { mongo } from "mongoose";

const userVideoViewSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    videoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VideoFiles",
      required: true,
    },
    pointsEarned: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("UserVideoView", userVideoViewSchema);
