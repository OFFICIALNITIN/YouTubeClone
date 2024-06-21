import express, { Router } from "express";
import { login, verifyOTP } from "../controllers/auth.js";
import { updateChannelData, getAllChannels } from "../controllers/channel.js";
import getLocation from "../middleware/location.js";

const routes = express.Router();

routes.post("/login", getLocation, login);
routes.patch("/update/:id", updateChannelData);
routes.get("/getAllChannels", getAllChannels);
routes.post("/verify-otp", verifyOTP);

export default routes;
