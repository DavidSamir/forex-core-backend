import { Request, Response } from 'express';
import Trade from '../models/Trade';
import { executeTrade } from '../services/tradeService';
import { tradeSchema } from '../utils/validationSchemas';

export const executeTradeController = async (req: Request, res: Response) => {
  try {
    const { error } = tradeSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { accountId } = req.params;
    const { type, symbol, quantity, price } = req.body;

    const result = await executeTrade(accountId, type, symbol, quantity, price);
    res.status(201).json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getTrades = async (req: Request, res: Response) => {
  try {
    const trades = await Trade.find({ account: req.params.accountId });
    res.json(trades);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
