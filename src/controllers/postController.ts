import { Request, Response } from 'express';
// import { getConnection } from 'typeorm';
import { Post } from '../entity';

export const createPost = async (req: Request, res: Response) => {
  const { title, body } = req.body;
  const user = res.locals.user;
  const post = Post.create({ title, body, user });

  await post.save();
  return res.json(post);
};

export const getAllPosts = async (_: Request, res: Response) => {
  const posts = await Post.find({
    relations: ['user', 'comments', 'likes'],
    order: { createdAt: 'DESC' },
    take: 10,
  });

  return res.json(posts);
};

export const getOnePost = async (req: Request, res: Response) => {
  const id = req.params.id;

  const post = await Post.findOne({ id }, { relations: ['user', 'comments'] });
  if (!post) {
    return res.status(400).json({ error: 'Post not found' });
  }

  return res.json(post);
};

export const updateOnePost = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { title, body } = req.body;

  const post = await Post.findOne({ id }, { relations: ['user'] });

  if (!post) return res.status(400).json({ error: 'Post not found' });
  const isLoggedInUsersPost = res.locals.user.id === post.user.id;

  if (!isLoggedInUsersPost)
    return res.status(400).json({ error: 'Unauthorized' });

  post.title = title || post.title;
  post.body = body || post.body;
  if (title || body) await post.save();

  return res.json(post);
};

export const deleteOnePost = async (req: Request, res: Response) => {
  const id = req.params.id;

  const post = await Post.findOne({ id }, { relations: ['user'] });
  if (!post) {
    return res.status(400).json({ error: 'Post not found' });
  }

  const isLoggedInUsersPost = res.locals.user.id === post.user.id;
  if (!isLoggedInUsersPost)
    return res.status(400).json({ error: 'Unauthorized' });

  return res.send('delete req for a post');
};
