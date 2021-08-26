import { Account } from 'src/accounts/entities/account.entity';
import { CurrencyType } from 'src/common/enums/currency-type.enum';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Currency {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: CurrencyType,
    default: CurrencyType.FIAT,
  })
  type: CurrencyType;

  @OneToMany(() => Account, (account) => account.currencies)
  account: Account[];
}
