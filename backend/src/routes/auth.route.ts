

import express from "express";
import { signIn, logout, checkAuth } from "../controllers/auth.controller"
import { protectedRoute } from "../middleware/auth.middleware";

const router = express.Router();

router.post("/sign-in", signIn);
router.post("/logout", logout);
router.post("/check", protectedRoute, checkAuth)

export default router

