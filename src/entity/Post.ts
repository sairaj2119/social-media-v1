import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';

import Base from './Base';
import User from './User';
import Comment from './Comment'

@Entity('posts')
export default class Post extends Base {
  @Column()
  title: string;

  @Column()
  body: string;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[] 

  @ManyToOne(() => User)
  user: User;
}
