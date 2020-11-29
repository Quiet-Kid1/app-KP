import express from 'express';

const router = express.Router();

import {
  authUsers,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from '../controllers/usersController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/').get(protect, getUsers);
router.post('/login', authUsers);
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router
  .route('/:id')
  .delete(protect, deleteUser)
  .get(protect, getUserById)
  .put(protect, updateUser);

export default router;
