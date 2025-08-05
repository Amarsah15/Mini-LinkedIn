import express from "express";
import { getUserProfile, updateProfile } from "../controllers/profile.controller.js";
import { auth } from "../middleware/auth.middleware.js";
import { validateProfileUpdate } from "../middleware/validation.middleware.js";

const profileRoutes = express.Router();

profileRoutes.get("/", auth, getUserProfile);
profileRoutes.put("/update", auth, validateProfileUpdate, updateProfile);

export default profileRoutes;
