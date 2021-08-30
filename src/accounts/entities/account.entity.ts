import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { User } from 'src/users/entities/user.entity';
import { Bank } from 'src/banks/entities/bank.entity';
import { Currency } from 'src/currency/entities/currency.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  sortCode?: string;

  @Column({ type: 'smallint' })
  accountNumber: number;

  @Column({ type: 'numeric', precision: 15, scale: 6 })
  balance: number = 0;

  @OneToMany(() => Bank, (bank) => bank.account)
  @ApiProperty({ type: [Bank], isArray: true  })
  banks: Bank[];

  @OneToMany(() => Currency, (currency) => currency.account)
  @ApiProperty({ type: [Currency], isArray: true  })
  currencies: Currency[];

  @OneToMany(() => Transaction, (transaction) => transaction.account)
  @ApiProperty({ type: [Transaction], isArray: true  })
  transactions: Transaction[];

  @ManyToOne(() => User, (user) => user.accounts, { nullable: false })
  @ApiProperty({ type: User })
  user: User;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: string;
}
