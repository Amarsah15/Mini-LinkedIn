import express from "express";
import { getUserProfile } from "../controllers/profile.controller.js";
import { auth } from "../middleware/auth.middleware.js";

const profileRoutes = express.Router();

profileRoutes.get("/", auth, getUserProfile);

export default profileRoutes;
