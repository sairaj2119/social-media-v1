import { Request, Response } from 'express';
import Post from '../entity/Post';

export const createPost = async (req: Request, res: Response) => {
  const { title, body } = req.body;
  const user = res.locals.user;
  const post = Post.create({ title, body, user });

  await post.save();

  return res.json(post);
};

export const getAllPosts = async (_: Request, res: Response) => {
  const posts = await Post.find({
    relations: ['user'],
    order: { createdAt: 'DESC' },
  });
  return res.json(posts);
};
