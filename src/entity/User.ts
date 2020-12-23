import { Entity, Column, Index, BeforeInsert, OneToMany } from 'typeorm';
import bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';

import Base from './Base';
import Post from './Post';
import { IsEmail, Length } from 'class-validator';

@Entity('users')
export default class User extends Base {
  @Length(3, 255)
  @Index()
  @Column()
  username: string;

  @IsEmail({}, { message: 'Invalid email address' })
  @Index()
  @Column()
  email: string;

  @Exclude()
  @Length(6, 255)
  @Column()
  password: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
