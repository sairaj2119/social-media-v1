import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';

import Base from './Base';
import User from './User';
import Comment from './Comment';
import Like from './Like';

@Entity('posts')
export default class Post extends Base {
  @Column()
  title: string;

  @Column()
  body: string;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.post)
  likes: Like[];

  @ManyToOne(() => User)
  user: User;
}
