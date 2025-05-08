import { Request, Response } from "express";
import generateToken, { Auth } from "../utils/authUtils";
import { check } from "../config/services/auth.service";

export const signUp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ data: { error: "Required missing parameters." } });
      return;
    }

    const user: any = check(email);

    if (!user || user.password !== password) {
      res.status(400).json({ data: { error: "Invalid email or password." } });
      return;
    }

    res.status(200).json({
      data: {
        id: user.id,
        email: user.email,
        password: user.password,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Sign up error:", error);
    res.status(500).json({ data: { error: "Internal server error." } });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  // Implementation pending
};
