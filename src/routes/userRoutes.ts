import { Router } from 'express';

import {
  getAllUsers,
  getLoggedInUserProfile,
  getUserProfile,
} from '../controllers/userController';
import { auth } from '../middlewares/auth';

const router = Router();

router.get('/', getAllUsers);
router.get('/me', auth, getLoggedInUserProfile);
router.get('/:username', getUserProfile);

export default router;
