import jwt from 'jsonwebtoken';
import env from '../config/environment';

export const generateToken = (userId: string) => {
  return jwt.sign({ userId }, env.jwtSecret, { expiresIn: '1h' });
};
