import db from "../database";
import { Auth, ErrorResponse } from "../models/Auth";

export function check(email?: string): Auth | ErrorResponse {
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
      password: user.password,
      role: user.role,
    };
  } catch (error: any) {
    console.error("Error in auth service checking user credentials:", error);
    return { error: error.message || "An unknown error occurred." };
  }
}
