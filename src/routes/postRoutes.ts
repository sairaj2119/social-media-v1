import { Router } from 'express';
import { auth } from '../middlewares/auth';
import { createPost, getAllPosts } from '../controllers/postController';

const router = Router();

router.get('/', getAllPosts);
router.post('/', auth, createPost);

export default router;
