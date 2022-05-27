import { AccountEntity } from 'src/modules/account/entities/account.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('bank')
export class BankEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  country: string;

  @Column('text', { array: true })
  colors: string[];

  @Column()
  img: string;

  @OneToMany(() => AccountEntity, (account) => account.bank)
  accounts: AccountEntity[];
}
