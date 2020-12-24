import { Router } from 'express';
import { auth } from '../middlewares/auth';
import {
  createPost,
  getAllPosts,
  getOnePost,
} from '../controllers/postController';

const router = Router();

router.route('/').get(getAllPosts).post(auth, createPost);
router.get('/:id', getOnePost);

export default router;
