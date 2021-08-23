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

  @Column({ type: 'numeric', precision: 15, scale: 6 })
  debitAmount: string;

  @Column({ type: 'numeric', precision: 15, scale: 6 })
  creditAmount: string;

  @Column({ type: 'numeric', precision: 15, scale: 6 })
  balance: number;

  @ManyToOne(() => BankAccount, (bankAccount) => bankAccount.transactions, {
    nullable: false,
  })
  bankAccount: BankAccount;
}
