import { Request, Response, Router } from 'express';
import { User } from '../entity/User';

const router = Router();

// REGISTER  a user
router.get('/', async (_: Request, res: Response) => {
  const users = await User.find();

  res.json(users);
});

export default router;
