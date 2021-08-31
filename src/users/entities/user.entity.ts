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

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({ default: 'PLN' })
  baseCurrency: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: string;

  @OneToMany(() => AccountEntity, account => account.user)
  accounts: AccountEntity[];

  @BeforeInsert() async hashPassword() {
    this.password = await argon2.hash(this.password);
  }

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
