import UserVideoView from "../models/userVideoView.js";
import videoFiles from "../models/videoFiles.js";
import User from "../models/auth.js";

export const uploadVideo = async (req, res, next) => {
  console.log(req.file);
  if (req.file === undefined) {
    res.status(404).json({ message: "Plz Upload a '.mp4' video file only" });
  } else {
    try {
      const file = new videoFiles({
        videoTitle: req.body.title,
        fileName: req.file.originalname,
        filePath: req.file.path,
        fileType: req.file.mimetype,
        fileSize: req.file.size,
        videoChannel: req.body.channel,
        Uploader: req.body.Uploader,
      });
      await file.save();
      res.status(201).send("File uploaded successfully");
    } catch (error) {
      res.status(400).send(error.message);
    }
  }
};

export const getAllVideos = async (req, res) => {
  try {
    const files = await videoFiles.find();
    res.status(200).send(files);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

export const watchVideo = async (req, res) => {
  const { userId, videoId } = req.body;

  try {
    console.log(`User ID: ${userId}, Video ID: ${videoId}`);

    // Check if the user has already watched this specific video
    let userVideoView = await UserVideoView.findOne({ userId, videoId });

    if (!userVideoView) {
      // Check if the user has watched other videos
      const userViews = await UserVideoView.find({ userId });
      let points = 5;

      if (userViews.length > 0) {
        // If the user has already watched videos, increment the points
        points = 5 + userViews.length * 5;
      }

      // Insert new view record
      userVideoView = new UserVideoView({
        userId,
        videoId,
        pointsEarned: points,
      });
      await userVideoView.save();
    } else {
      // Update existing view record
      userVideoView.pointsEarned += 5; // Increment points by 5 for simplicity
      await userVideoView.save();
    }

    // Update user points
    await User.findByIdAndUpdate(userId, {
      $inc: { points: userVideoView.pointsEarned },
    });

    res.status(200).json({
      message: "Points allocated successfully",
      points: userVideoView.pointsEarned,
    });
  } catch (error) {
    console.error("Error in watchVideo controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserPoints = async (req, res) => {
  const { userId } = req.params;

  try {
    const latestUserView = await UserVideoView.findOne({ userId }).sort({
      updatedAt: -1,
    });

    if (!latestUserView) {
      return res.status(200).json({ points: 0 });
    }

    res.status(200).json({
      points: latestUserView.pointsEarned,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internall server error" });
  }
};
