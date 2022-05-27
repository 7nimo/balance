import { CurrencyType } from 'src/core/common/enums/currency-type.enum';
import { AccountEntity } from 'src/modules/account/entities/account.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('currency')
export class CurrencyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @Column()
  name: string;

  @Column()
  symbol: string;

  @Column({ default: CurrencyType.FIAT })
  type: CurrencyType;

  @OneToMany(() => AccountEntity, (account) => account.currency)
  accounts: AccountEntity[];
}
