import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from 'src/accounts/entities/account.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column({ type: 'date' })
  @Column({ type: 'varchar' })
  transactionDate: string;

  @Column()
  transactionDesc: string;

  // to do: extract transaction types
  @Column()
  transactionType: string;

  @Column({ type: 'numeric', precision: 15, scale: 6, nullable: true })
  debitAmount: number;

  @Column({ type: 'numeric', precision: 15, scale: 6, nullable: true })
  creditAmount: number;

  @Column({ type: 'numeric', precision: 15, scale: 6 })
  balance: number;

  @ManyToOne(() => Account, (account) => account.transactions, {
    nullable: false,
  })
  account: Account;
}
