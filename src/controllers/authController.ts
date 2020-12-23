import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import cookie from 'cookie';

import { User } from '../entity/User';

export const registerUser = async (req: Request, res: Response) => {
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
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ error: 'Invalid credentials' });
  const valid = await compare(password, user.password);
  if (!valid) return res.status(400).json({ error: 'Invalid credentials' });

  const token = sign({ uuid: user.uuid }, process.env.JWT_SECRET!);
  res.set(
    'Set-Cookie',
    cookie.serialize('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600,
      path: '/',
    })
  );

  return res.send('logged in successfully check your cookies');
};
