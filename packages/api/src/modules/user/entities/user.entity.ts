import { Exclude } from 'class-transformer';
import { AccountEntity } from 'src/modules/account/entities/account.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @Exclude()
  @Column({ select: false })
  password?: string;

  @Exclude()
  @Column({ select: false, nullable: true })
  refreshToken?: string;

  @Column({ default: 'PLN' })
  baseCurrency: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: string;

  @OneToMany(() => AccountEntity, (account) => account.user)
  accounts: AccountEntity[];

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
