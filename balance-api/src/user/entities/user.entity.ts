import * as argon2 from 'argon2';
import { Exclude } from 'class-transformer';
import { AccountEntity } from 'src/account/entities/account.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BeforeInsert,
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

  @Exclude()
  @Column({ select: false })
  password: string;

  @Exclude()
  @Column({ select: false, nullable: true })
  refreshToken?: string | null;

  @Column({ default: 'PLN' })
  baseCurrency: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: string;

  @OneToMany(() => AccountEntity, (account) => account.user)
  accounts: AccountEntity[];

  @BeforeInsert() async hashPassword() {
    this.password = await argon2.hash(this.password);
  }

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
