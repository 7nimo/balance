import { AccountEntity } from 'src/account/entities/account.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('bank')
export class BankEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => AccountEntity)
  @JoinColumn()
  account: AccountEntity;
}
