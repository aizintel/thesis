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
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthRequest["user"];
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

type Role = "admin" | "manager" | "employee" | "viewer";

export const requireRole = (...allowedRoles: Role[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = req.user;

    if (!user) {
      return res.status(403).json({ message: "Forbidden: No user data found" });
    }

    const role = user.role as "admin" | "manager" | "employee" | "viewer";

    if (!allowedRoles.includes(role)) {
      return res.status(403).json({ message: "Forbidden: You don't have permission" });
    }

    next();
  };
};

