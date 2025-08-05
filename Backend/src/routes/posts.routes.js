import express from "express";
import { createPost, deletePost, getAllPosts } from "../controllers/post.controller.js";
import { auth } from "../middleware/auth.middleware.js";

const postRoutes = express.Router();

postRoutes.post("/create", auth, createPost);
postRoutes.get("/getAll", getAllPosts);
postRoutes.delete('/:id', auth, deletePost);

export default postRoutes;
