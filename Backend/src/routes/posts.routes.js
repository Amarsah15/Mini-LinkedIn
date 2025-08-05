import express from "express";
import { createPost, getAllPosts } from "../controllers/post.controller.js";
import { auth } from "../middleware/auth.middleware.js";

const postRoutes = express.Router();

postRoutes.post("/create", auth, createPost);
postRoutes.get("/getAll", getAllPosts);

export default postRoutes;
