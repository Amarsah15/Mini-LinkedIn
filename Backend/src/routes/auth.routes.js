import Router from "express";
import {
  check,
  login,
  logout,
  register,
} from "../controllers/auth.controller.js";
import { auth } from "../middleware/auth.middleware.js";
import { authLimiter } from "../middleware/rateLimiter.middleware.js";
import {
  validateRegistration,
  validateLogin,
} from "../middleware/validation.middleware.js";

const authRoutes = Router();

authRoutes.use(authLimiter);
authRoutes.post("/register", validateRegistration, register);
authRoutes.post("/login", validateLogin, login);
authRoutes.post("/logout", auth, logout);
authRoutes.get("/check", auth, check);

export default authRoutes;
