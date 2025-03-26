import { Request, Response } from 'express';
import Account from '../models/Account';
import Transaction from '../models/Transaction';
import { AuthRequest } from '../middleware/authMiddleware';

export const addCredit = async (req: AuthRequest, res: Response) => {
  try {
    const { amount } = req.body;
    const account = await Account.findById(req.params.accountId);
    if (!account) return res.status(404).json({ error: 'Account not found' });

    account.credit += amount;
    await account.save();

    // Optionally create a transaction record
    const transaction = new Transaction({
      account: account._id,
      type: 'deposit',
      amount
    });
    await transaction.save();

    res.json({ message: 'Credit added', credit: account.credit });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getAccountDetails = async (req: AuthRequest, res: Response) => {
  try {
    const account = await Account.findById(req.params.accountId);
    if (!account) return res.status(404).json({ error: 'Account not found' });
    res.json(account);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
