import { Entity, Column, ManyToOne } from 'typeorm';

import Base from './Base';
import User from './User';

@Entity('posts')
export default class Post extends Base {
  @Column()
  title: string;

  @Column()
  body: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;
}
