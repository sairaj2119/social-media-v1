import { Router } from 'express';

import {
  deleteComment,
  postComment,
  editComment,
} from '../controllers/commentController';
import { auth } from '../middlewares/auth';

const router = Router();

router.route('/:pid/:cid').put(auth, editComment).delete(auth, deleteComment);

router.post('/:pid', auth, postComment);

export default router;
