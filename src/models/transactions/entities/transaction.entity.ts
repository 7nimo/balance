import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Bank } from "src/models/banks/entities/bank.entity";
import { User } from "src/models/users/entities/user.entity";

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamptz' })
  transaction_date: string;

  @Column()
  transaction_desc: string;

  @Column()
  debit_amount: number;

  @Column()
  credit_amount: number;

  @Column()
  balance: number;

  @ManyToOne(type => User, user => user.transactions)
  user: User;

  @OneToOne(() => Bank)
  @JoinColumn()
  bank: Bank;
}
