import jwt from 'jsonwebtoken';

const JWT_SECRET = 'bai'; 
const TOKEN_EXPIRY = '1h';

const generateToken = (id: string): string => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: TOKEN_EXPIRY });
};

export default generateToken;