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
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { BankEntity } from 'src/modules/bank/entities/bank.entity';
import { CurrencyEntity } from 'src/modules/currency/entities/currency.entity';
import { TransactionEntity } from 'src/modules/transaction/entities/transaction.entity';

@Entity('account')
export class AccountEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  sortCode: string;

  @Column({ nullable: true })
  accountNumber: string;

  @Column({ type: 'numeric', precision: 15, scale: 6, default: 0 })
  balance: number;

  @OneToOne(() => BankEntity)
  @JoinColumn()
  bank: BankEntity;

  @OneToOne(() => CurrencyEntity)
  @JoinColumn()
  currency: CurrencyEntity;

  @OneToMany(() => TransactionEntity, (transaction) => transaction.account)
  transactions: TransactionEntity[];

  @ManyToOne(() => UserEntity, (user) => user.accounts, { nullable: false })
  user: UserEntity;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: string;
}
