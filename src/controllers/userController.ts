import { Request, Response } from 'express';
import { User } from '../entity';

export const getLoggedInUserProfile = async (_: Request, res: Response) => {
  return res.send(res.locals.user);
};

export const getAllUsers = async (_: Request, res: Response) => {
  const users = await User.find();
  return res.json(users);
};

export const getUserProfile = async (req: Request, res: Response) => {
  const username = req.params.username;
  console.log(username);
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ error: 'user not found' });
  }
  return res.json(user);
};
