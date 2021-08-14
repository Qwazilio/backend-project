import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  idUser: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: false })
  subscription: boolean;

  @Column({ default: null})
  books: number;
}