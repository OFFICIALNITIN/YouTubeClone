import comment from "../models/comments.js";
import mongoose from "mongoose";

export const postComment = async (req, res) => {
  const commentData = req.body;

  const postComment = new comment(commentData);

  try {
    await postComment.save();
    res.status(200).json("Posted the comment");
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getComments = async (req, res) => {
  try {
    const commentList = await comment.find();

    res.status(200).send(commentList);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

export const deleteComment = async (req, res) => {
  const { id: id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("comment is Unavailable..");
  }
  try {
    await comment.findOneAndDelete(id);
    res.status(200).json({ message: "comment Removed" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateComment = async (req, res) => {
  const { id: _id } = req.params;
  const { commentBody } = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send("comment is Unavailable..");
  }
  // console.log(commentBody);
  try {
    const updatedComment = await comment.findByIdAndUpdate(
      _id,
      {
        $set: { commentBody: commentBody },
      },
      { new: true }
    );
    res.status(200).json(updatedComment);
  } catch (error) {
    res.status(400).json(error);
  }
};
