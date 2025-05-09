import jwt from 'jsonwebtoken';

const JWT_SECRET = 'bai'; 
const TOKEN_EXPIRY = '1h';

const generateToken = (id: string): string | null => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
};

const decodeToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET); 
  } catch (err) {
    return null;
  }
};

export { generateToken, decodeToken };
