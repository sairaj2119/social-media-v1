import { validate } from 'class-validator';
import { Request, Response, Router } from 'express';
import { User } from '../entity/User';
const router = Router();

router.post('/register', async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  let errors: any = {};

  const emailUser = await User.findOne({ email });
  const usernameUser = await User.findOne({ username });

  if (emailUser) errors.email = 'Email is already taken';
  if (usernameUser) errors.username = 'Username is already taken';
  if (Object.keys(errors).length > 0) return res.status(400).json(errors);

  const user = User.create({ username, email, password });
  errors = await validate(user);

  if (Object.keys(errors).length > 0) {
    return res.status(400).json(errors);
  }

  await user.save();

  return res.status(201).json(user);
});

// router.post('/login', async (req: Request, res: Response) => {});

export default router;
