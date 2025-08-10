import express from 'express';
import { AuthenticatedRequest } from '../middleware/auth';

const router = express.Router();

// Get current user profile
router.get('/profile', async (req: AuthenticatedRequest, res) => {
  // Implementation coming soon
  res.json({ message: 'User profile endpoint' });
});

// Update user profile
router.put('/profile', async (req: AuthenticatedRequest, res) => {
  // Implementation coming soon
  res.json({ message: 'Update user profile endpoint' });
});

export default router;
