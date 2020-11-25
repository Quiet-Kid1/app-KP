import express from 'express';

const router = express.Router();

import {
  authUsers,
  getUserProfile,
  updateUserProfile,
} from '../controllers/usersController.js';
import { protect } from '../middleware/authMiddleware.js';

router.post('/login', authUsers);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
export default router;
