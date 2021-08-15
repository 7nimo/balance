import * as argon2 from 'argon2';
import { Exclude } from 'class-transformer';
import { IsString } from 'class-validator';
import { Transaction } from 'src/models/transactions/entities/transaction.entity';
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
  @IsString()
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