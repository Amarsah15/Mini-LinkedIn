import express from "express";
import { auth } from "../middleware/auth.middleware.js";
import {
  getFollowStatus,
  toggleFollow,
} from "../controllers/user.controller.js";

const userRoutes = express.Router();

userRoutes.post("/:userId/follow", auth, toggleFollow);
userRoutes.get("/:userId/follow-status", auth, getFollowStatus);

export default userRoutes;
