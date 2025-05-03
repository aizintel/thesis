

import express from "express";
import { signUp, logout } from "../controllers/auth.controller"
const router = express.Router();

router.post("/sign-up", signUp);
router.post("/logout", logout);

export default router

