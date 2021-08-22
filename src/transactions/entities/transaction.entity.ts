import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BankAccount } from 'src/bank-accounts/entities/bank-account.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamptz' })
  transactionDate: string;

  @Column()
  transactionDesc: string;

  @Column()
  transactionType: string;

  @Column()
  debitAmount: number;

  @Column()
  creditAmount: number;

  @Column()
  balance: number;

  @ManyToOne(() => BankAccount, (bankAccount) => bankAccount.transactions)
  bankAccount: BankAccount;
}
