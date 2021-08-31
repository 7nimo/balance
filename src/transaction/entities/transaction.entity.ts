import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AccountEntity } from 'src/account/entities/account.entity';

@Entity('transaction')
export class TransactionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  transactionDate: string;

  @Column()
  transactionDesc: string;

  @Column()
  transactionType: string;

  @Column({ type: 'numeric', precision: 15, scale: 6, nullable: true })
  debitAmount: number;

  @Column({ type: 'numeric', precision: 15, scale: 6, nullable: true })
  creditAmount: number;

  @Column({ type: 'numeric', precision: 15, scale: 6 })
  balance: number;

  @ManyToOne(() => AccountEntity, (account) => account.transactions, {
    nullable: false,
  })
  account: AccountEntity;
}
