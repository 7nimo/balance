import { CurrencyType } from 'src/common/enums/currency-type.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('currency')
export class CurrencyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  name: string;

  @Column({ default: CurrencyType.FIAT })
  type: CurrencyType;
}
