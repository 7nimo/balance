import { AccountEntity } from 'src/account/entities/account.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Bank {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => AccountEntity)
  @JoinColumn()
  account: AccountEntity;
}
