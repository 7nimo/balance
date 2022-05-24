import { CurrencyType } from 'src/core/common/enums/currency-type.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
