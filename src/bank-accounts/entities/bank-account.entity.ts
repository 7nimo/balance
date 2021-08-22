import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Length } from "class-validator";
import { Transaction } from "src/transactions/entities/transaction.entity";
import { User } from "src/users/entities/user.entity";
import { Bank } from "src/banks/entities/bank.entity";
import { Currency } from "./currency.entity";

@Entity()
export class BankAccount {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  sortCode?: number;

  @Column()
  accountNumber?: number;
  
  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: string;

  @OneToOne(() => Bank)
  @JoinColumn()
  bank: Bank;

  @OneToOne(() => Currency)
  @JoinColumn()
  currency: Currency;

  @OneToMany(type => Transaction, transaction => transaction.bankAccount)
  transactions: Transaction[];

  @ManyToOne(type => User, user => user.bankAccounts)
  user: User[];
}
