import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = "bai"; 

export interface AuthRequest extends Request {
  user?: {
    id: string | number;
    email: string;
    role: "admin" | "manager" | "employee" | "viewer";
    [key: string]: any;
  };
}

export const protectedRoute = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies?.token;

  if (!token) {
    res.status(401).json({ data: { message: "Unauthorized: No token provided" } });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthRequest["user"];
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ data: { message: "Unauthorized: Invalid or expired token" } });
  }
};

type Role = "admin" | "manager" | "employee" | "viewer";

export const requireRole = (...allowedRoles: Role[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction): void => {
    const user = req.user;

    if (!user) {
      res.status(403).json({ data: { message: "Forbidden: No user data found" } });
      return;
    }

    const role = user.role;

    if (!allowedRoles.includes(role)) {
      res.status(403).json({ data: { message: "Forbidden: You don't have permission" } });
      return;
    }

    next();
  };
};
