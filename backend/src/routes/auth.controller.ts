

import express from "express";
import { signIn, logout } from "../controllers/auth.controller"
const router = express.Router();

router.post("/sign-in", signIn);
router.post("/logout", logout);

export default router

