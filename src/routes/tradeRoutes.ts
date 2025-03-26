import { Router } from 'express';
import { executeTradeController, getTrades } from '../controllers/tradeController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// Example: /api/trades/:accountId
router.post('/:accountId', authMiddleware, executeTradeController);
router.get('/:accountId', authMiddleware, getTrades);

export default router;
