import { Request, Response } from 'express';
import { Profile, User } from '../entity';

export const getLoggedInUserProfile = async (_: Request, res: Response) => {
  return res.send(res.locals.user);
};

export const getAllUsers = async (_: Request, res: Response) => {
  const users = await User.find();
  return res.json(users);
};

export const getUserDetails = async (req: Request, res: Response) => {
  const username = req.params.username;
  console.log(username);
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(400).json({ error: 'user not found' });
  }
  return res.json(user);
};

export const getUserProfile = async (req: Request, res: Response) => {
  const username = req.params.username;
  const user = await User.findOne({ username }, { relations: ['profile'] });
  if (!user) {
    return res.status(400).json({ error: 'user not found' });
  }
  return res.json(user.profile);
};

export const postUserProfile = async (req: Request, res: Response) => {
  const { bio, photo } = req.body;
  const { user } = res.locals;
  const profileSearchObj: any = {};

  const authUser = await User.findOne({ username: user.username });

  if (!authUser) return res.json({ error: 'user not found' });

  if (bio) profileSearchObj.bio = bio;
  if (photo) profileSearchObj.photo = photo;

  const profile = Profile.create({ bio, photo });
  authUser.profile = profile;

  await profile.save();
  await authUser.save();

  return res.json(user);
};
