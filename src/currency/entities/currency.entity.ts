import { AccountEntity } from 'src/account/entities/account.entity';
import { CurrencyType } from 'src/common/enums/currency-type.enum';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class CurrencyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column({ default: CurrencyType.FIAT })
  type: CurrencyType;

  @OneToOne(() => AccountEntity)
  @JoinColumn()
  account: AccountEntity;
}
