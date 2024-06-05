import LikedVideo from "../models/likedVideo.js";
// import mongoose from "mongoose";

export const likeVideoController = async (req, res) => {
  const likedVideoData = req.body;

  // console.log(likedVideoData);
  const addToLikedVideo = new LikedVideo(likedVideoData);

  try {
    await addToLikedVideo.save();
    res.status(200).json("added to liked Video");
    console.log("Done");
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getAllLikeVideoController = async (req, res) => {
  try {
    const gelllikeVideos = await LikedVideo.find();
    res.status(200).send(gelllikeVideos);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

export const deleteLikeVideoController = async (req, res) => {
  const { videoId: videoId, Viewer: Viewer } = req.params;
  try {
    await LikedVideo.findOneAndDelete({
      videoId: videoId,
      Viewer: Viewer,
    });

    res.status(200).json({ message: "Removed from yout liked videos" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
