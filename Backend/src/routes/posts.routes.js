import express from "express";
import { createPost, deletePost, getAllPosts } from "../controllers/post.controller.js";
import { auth } from "../middleware/auth.middleware.js";
import { validatePost } from "../middleware/validation.middleware.js";

const postRoutes = express.Router();

postRoutes.post("/create", auth, validatePost, createPost);
postRoutes.get("/getAll", getAllPosts);
postRoutes.delete('/:id', auth, deletePost);

export default postRoutes;
