import { Entity, Column, Index, BeforeInsert } from 'typeorm';
import bcrypt from 'bcryptjs';

import { Base } from './Base';
import { IsEmail, Length } from 'class-validator';

@Entity('users')
export class User extends Base {
  @Length(3, 255)
  @Index()
  @Column()
  username: string;

  @IsEmail({}, { message: 'Invalid email address' })
  @Index()
  @Column()
  email: string;

  @Length(6, 255)
  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
  toJSON() {
    return { ...this, id: undefined, password: undefined };
  }
}
