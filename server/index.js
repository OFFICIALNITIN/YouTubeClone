import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/user.js";
import videoRoutes from "./routes/video.js";
import commentRoutes from "./routes/comment.js";
import bodyParser from "body-parser";
import path from "path";
import { Server } from "socket.io";
import http from "http";
import helmet from "helmet";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    method: ["GET", "POST"],
  },
});
const PORT = process.env.PORT;

app.use(
  cors({
    origin: "https://devcloneyoutube.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Specify allowed methods
    credentials: true, // Allow cookies to be sent if needed
  })
);
app.use(helmet());
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  res.setHeader("Cross-Origin-Resource-Policy", "same-site");

  next();
});

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

io.on("connection", (socket) => {
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("callended");
  });

  socket.on("calluser", ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit("calluser", { signal: signalData, from, name });
  });

  socket.on("answercall", (data) => {
    io.to(data.to).emit("callaccepted", data.signal);
  });
});

server.listen(PORT, () => {
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
