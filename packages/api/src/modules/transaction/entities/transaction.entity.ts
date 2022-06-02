import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { AccountEntity } from 'src/modules/account/entities/account.entity';

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
  debitAmount: string;

  @Column({ type: 'numeric', precision: 15, scale: 6, nullable: true })
  creditAmount: string;

  @Column({ type: 'numeric', precision: 15, scale: 6 })
  balance: string;

  @ManyToOne(() => AccountEntity, (account) => account.transactions, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  account: AccountEntity;
}
