import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Length } from "class-validator";
import { Transaction } from "src/transactions/entities/transaction.entity";
import { User } from "src/users/entities/user.entity";

@Entity()
export class BankAccount {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  @Length(6)
  sortCode?: number;

  @Column()
  accountNumber?: number;

  @OneToMany(type => Transaction, transaction => transaction.bankAccount)
  transactions: Transaction[];

  @ManyToOne(type => User, user => user.bankAccounts)
  user: User[];

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: string;
}
