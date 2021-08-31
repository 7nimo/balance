import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { User } from 'src/users/entities/user.entity';
import { Bank } from 'src/banks/entities/bank.entity';
import { Currency } from 'src/currency/entities/currency.entity';

@Entity()
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  sortCode: string;

  @Column({ type: 'integer', nullable: true })
  accountNumber: number;

  @Column({ type: 'numeric', precision: 15, scale: 6, default: 0 })
  balance: number;

  @OneToOne(() => Bank, { nullable: false })
  @JoinColumn()
  bank: Bank;

  @OneToOne(() => Currency, { nullable: false })
  @JoinColumn()
  currency: Currency;

  @OneToMany(() => Transaction, (transaction) => transaction.account)
  transactions: Transaction[];

  @ManyToOne(() => User, user => user.accounts, { nullable: false })
  user: User;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: string;
}
