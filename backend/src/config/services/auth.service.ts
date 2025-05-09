import db from "../database";
import { Auth, ErrorResponse } from "../models/Auth";

export function getInfoByEmail(email?: string): Auth | ErrorResponse {
  try {
    const user: any = db
      .prepare("SELECT * FROM users WHERE email = ?")
      .get(email);

    if (!user) {
      return { error: "Invalid email or password." };
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      password: user.password,
      role: user.role,
    };
  } catch (error: any) {
    console.error("Error in auth service checking user credentials:", error);
    return { error: error.message || "An unknown error occurred." };
  }
}

export function getInfoById(id: any): Auth | ErrorResponse {
  try {
    const user: any = db
      .prepare("SELECT * FROM users WHERE id = ?")
      .get(id);

    if (!user) {
      return { error: "Token is expired." };
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      password: user.password,
      role: user.role,
    };
  } catch (error: any) {
    console.error("Error in auth service checking user credentials:", error);
    return { error: error.message || "An unknown error occurred." };
  }
}
