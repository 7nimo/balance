import * as argon2 from 'argon2';
import { Exclude } from 'class-transformer';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true
  })
  email: string;

  @Exclude()
  @Column({
    type: 'varchar',
    nullable: false,
  })
  password: string;

  @OneToMany(type => Transaction, transaction => transaction.user)
  transactions: Transaction[];

  @BeforeInsert() async hashPassword() {
    this.password = await argon2.hash(this.password);
  }
}