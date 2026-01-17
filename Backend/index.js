import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";
import cookieParser from "cookie-parser";
import authRoutes from "./src/routes/auth.routes.js";
import postRoutes from "./src/routes/posts.routes.js";
import profileRoutes from "./src/routes/profile.routes.js";
import userRoutes from "./src/routes/user.routes.js";
import { connectDB } from "./src/config/db.js";

const app = express();

connectDB();

dotenv.config();

app.use(
  cors({
    origin: [
      "https://connectify-amarnath-kumar.vercel.app/",
      "http://localhost:5173",
    ],
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/users", userRoutes);

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("Welcome to the Mini LinkedIn");
});

app.get("/health", (req, res) => {
  res.status(200).json({ success: true, message: "Server is healthy" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
