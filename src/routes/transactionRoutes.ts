import { Router } from 'express';
import { getTransactions } from '../controllers/transactionController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// Example: /api/transactions/:accountId
router.get('/:accountId', authMiddleware, getTransactions);

export default router;
