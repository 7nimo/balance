import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { TransactionEntity } from 'src/modules/transaction/entities/transaction.entity';
import { BankEntity } from 'src/modules/context/entities/bank.entity';
import { CurrencyEntity } from 'src/modules/context/entities/currency.entity';

@Entity('account')
export class AccountEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  accountNumber: string;

  @Column({ type: 'numeric', precision: 10, scale: 2, default: 0 })
  balance: number;

  @ManyToOne(() => BankEntity, (bank) => bank.accounts)
  bank: BankEntity;

  @ManyToOne(() => CurrencyEntity, (currency) => currency.accounts)
  currency: CurrencyEntity;

  @OneToMany(() => TransactionEntity, (transaction) => transaction.account)
  transactions: TransactionEntity[];

  @ManyToOne(() => UserEntity, (user) => user.accounts, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user: UserEntity;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: string;
}
