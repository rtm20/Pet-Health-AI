import express from 'express';
import { AuthenticatedRequest } from '../middleware/auth';

const router = express.Router();

// Upload pet image
router.post('/image', async (req: AuthenticatedRequest, res) => {
  res.json({ message: 'Image upload endpoint' });
});

export default router;
