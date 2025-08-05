import Router from "express";
import { login, register } from "../controllers/auth.controller.js";
import { auth } from "../middleware/auth.middleware.js";

const authRoutes = Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);

export default authRoutes;
