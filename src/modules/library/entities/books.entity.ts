import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Books {
  @PrimaryGeneratedColumn()
  idBook: number;

  @Column()
  nameBook: string;

  @Column({ default: true })
  availability: boolean;

  @Column({default: null})
  owner: number;
}