import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, require: true },
  name: { type: String },
  desc: { type: String },
  joinedOn: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);
