import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/User';
import Account from '../models/Account';
import { generateToken } from '../services/authService';
import { registerSchema, loginSchema } from '../utils/validationSchemas';

export const register = async (req: Request, res: Response) => {
  try {
    const { error } = registerSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create an account for the user
    const account = new Account();
    await account.save();

    const user = new User({ username, password: hashedPassword, account: account._id });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = generateToken(user._id);
    res.json({ token });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
