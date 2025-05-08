import jwt from 'jsonwebtoken';

const JWT_SECRET = 'bai'; 
const TOKEN_EXPIRY = '1h';

export interface JwtPayload {
  id: string;
  email?: string; 
  passowrd?: string;
}

export interface Auth {
  id: string;
  email: string;
  password: string;
  role: string;
}


 const generateToken = (payload: JwtPayload): string => {
  return jwt.sign(payload.id, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
};

export default generateToken;