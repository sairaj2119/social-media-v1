import {
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from 'typeorm';

import { v4 as uuid } from 'uuid';

export class Base extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uuid: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  createUUID() {
    this.uuid = uuid();
  }
}
