import { Request, Response } from 'express';
import Transaction from '../models/Transaction';

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const transactions = await Transaction.find({ account: req.params.accountId });
    res.json(transactions);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

