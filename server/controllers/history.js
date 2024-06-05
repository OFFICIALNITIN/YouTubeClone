import history from "../models/history.js";
import mongoose from "mongoose";

export const historyController = async (req, res) => {
  const historyData = req.body;

  const addTohistory = new history(historyData);

  try {
    await addTohistory.save();
    res.status(200).json("added to history");
    // console.log("Done");
  } catch (error) {
    res.status(400).json(error);
  }
};

export const getAllhistoryController = async (req, res) => {
  try {
    const gethistoryVideos = await history.find();
    res.status(200).send(gethistoryVideos);
  } catch (error) {
    res.status(404).send(error.message);
  }
};

export const deletehistoryController = async (req, res) => {
  try {
    const { userId: userId } = req.params;
    await history.deleteMany({
      Viewer: userId,
    });

    res.status(200).json({ message: "Removed from your history." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
