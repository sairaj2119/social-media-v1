import { Entity, Column, ManyToOne } from 'typeorm';
import { Post, User } from '.';

import Base from './Base';

@Entity('comments')
export default class Comment extends Base {
  @Column()
  body: string;

  @Column()
  commentor: string

  @ManyToOne(() => Post)
  post: Post

  @ManyToOne(() => User)
  user: User
}

