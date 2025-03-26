import { Router } from 'express';
import { addCredit, getAccountDetails } from '../controllers/accountController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// Example: /api/accounts/:accountId/add-credit
router.post('/:accountId/add-credit', authMiddleware, addCredit);
router.get('/:accountId', authMiddleware, getAccountDetails);

export default router;
