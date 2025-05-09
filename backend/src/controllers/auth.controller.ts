import { Request, Response } from "express";
import { generateToken, decodeToken } from "../utils/authUtils";
import { getInfoByEmail, getInfoById } from "../config/services/auth.service";

export const signIn = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ data: { error: "Required missing parameters." } });
      return;
    }

    const user: any = getInfoByEmail(email);

    if (!user || user.password !== password) {
      res.status(400).json({ data: { error: "Invalid email or password." } });
      return;
    }

    const token = generateToken(user.id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600 * 1000,
      sameSite: "none",
      path: "/",
    });

    res.status(200).json({
      data: {
        id: user.id,
        email: user.email,
        password: user.password,
        role: user.role,
        token: token,
      },
    });
  } catch (error) {
    console.error("Sign up error:", error);
    res.status(500).json({ data: { error: "Internal server error." } });
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  const token = req.cookies?.token;

  if (!token) {
    res
      .status(400)
      .json({ data: { message: "No active session to log out from" } });
  }

  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  res.status(200).json({
    data: {
      message: "Logged out successfully",
    },
  });
};

export const checkAuth = async (req: Request, res: Response): Promise<void> => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      res.status(400).json({ data: { error: "No token provided." } });
    }

    const user: any = getInfoById(decodeToken(token));

    if (!user.id)
      res.status(400).json({ data: { error: "Token is invalid or expired." } });

    res.status(200).json({
      data: {
        id: user.id,
        email: user.email,
        password: user.password,
        role: user.role,
        token: token,
      },
    });
  } catch (error) {
    console.error("CheckAuth error:", error);
    res.status(500).json({ data: { error: "Internal server error." } });
  }
};
