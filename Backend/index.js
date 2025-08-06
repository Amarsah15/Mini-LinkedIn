import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import axios from "axios";
import cookieParser from "cookie-parser";
import authRoutes from "./src/routes/auth.routes.js";
import postRoutes from "./src/routes/posts.routes.js";
import profileRoutes from "./src/routes/profile.routes.js";
import { connectDB } from "./src/config/db.js";
import { generalLimiter } from "./src/middleware/rateLimiter.middleware.js";

const app = express();

connectDB();

dotenv.config();

app.use(generalLimiter);

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://mini-linked-in-umber.vercel.app",
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/posts", postRoutes);
app.use("/api/v1/profile", profileRoutes);

const PORT = process.env.PORT || 8000;

app.get("/", (req, res) => {
  res.send("Welcome to the Mini LinkedIn");
});

app.get("/health", (req, res) => {
  res.status(200).json({ success: true, message: "Server is healthy" });
});

// app.all("*", (req, res) => {
//   res.status(404).json({
//     success: false,
//     message: "Route not found, Error 404",
//   });
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const keepAlive = () => {
  setInterval(async () => {
    try {
      const res = await axios.get(
        "https://mini-linkedin-j86g.onrender.com/health",
        {
          timeout: 4000,
        }
      );
      console.log("✅ Ping successful:", res.status);
    } catch (error) {
      console.warn("⚠️ Ping failed:", error);
    }
  }, 1000 * 60 * 10); // every 10 minutes
};

keepAlive();
