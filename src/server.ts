import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express, { Request, Response } from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import userRoutes from './routes/userRoutes';
import authRoutes from './routes/authRoutes';

(async () => {
  const app = express();
  app.use(express.json());
  app.use(morgan('dev'));

  app.use(cookieParser());
  app.use('/users', userRoutes);
  app.use('/auth', authRoutes);

  app.get('/', (_: Request, res: Response) => {
    res.send('working');
  });

  await createConnection();
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log('server started');
  });
})();
