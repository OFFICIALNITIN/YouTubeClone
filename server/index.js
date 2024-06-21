import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/user.js";
import videoRoutes from "./routes/video.js";
import commentRoutes from "./routes/comment.js";
import bodyParser from "body-parser";
import path from "path";
import helmet from "helmet";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Specify allowed methods
    credentials: true, // Allow cookies to be sent if needed
  })
);
// app.use(helmet());
// app.use((req, res, next) => {
//   res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
//   res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
//   next();
// });

app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use("/upload", express.static(path.join("upload")));
app.use(bodyParser.json());

app.use("/user", userRoutes);
app.use("/video", videoRoutes);
app.use("/comment", commentRoutes);

// app.get("/", (req, res) => {
//   res.send("Hello from server");
// });
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

mongoose
  .connect(`${process.env.CONNECTION_URL}`)
  .then(() => {
    console.log("MongoDB connected!");
  })
  .catch((error) => {
    console.error(error);
  });
