import { Router } from 'express';

import {
  getAllUsers,
  getLoggedInUserProfile,
  getUserDetails,
  getUserProfile,
  postUserProfile,
} from '../controllers/userController';
import { auth } from '../middlewares/auth';

const router = Router();

router.get('/', getAllUsers);
router.get('/me', auth, getLoggedInUserProfile);
router.get('/:username', getUserDetails);
router.get('/p/:username', getUserProfile);
router.post('/p', auth, postUserProfile);

export default router;
