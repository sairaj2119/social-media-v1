import { Entity, Column, Index, BeforeInsert } from 'typeorm';
import bcrypt from 'bcryptjs';
import { Exclude } from 'class-transformer';

import Base from './Base';
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

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}
