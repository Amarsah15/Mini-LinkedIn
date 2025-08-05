import Router from "express";
import { login, logout, register } from "../controllers/auth.controller.js";
import { auth } from "../middleware/auth.middleware.js";

const authRoutes = Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post("/logout", auth, logout);

export default authRoutes;
