import { AccountEntity } from 'src/account/entities/account.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('bank')
export class BankEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => AccountEntity, (account) => account.bank)
  accounts: AccountEntity[];
}
