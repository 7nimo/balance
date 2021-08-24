import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from 'src/accounts/entities/account.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  // verify whether this is accurate
  @Column({ type: 'timestamptz' })
  transactionDate: string;

  @Column()
  transactionDesc: string;

  //this should be a relation
  @Column()
  transactionType: string;

  @Column({ type: 'numeric', precision: 15, scale: 6 })
  debitAmount: string;

  @Column({ type: 'numeric', precision: 15, scale: 6 })
  creditAmount: string;

  @Column({ type: 'numeric', precision: 15, scale: 6 })
  balance: number;

  @ManyToOne(() => Account, (account) => account.transactions, {
    nullable: false,
  })
  account: Account;
}
