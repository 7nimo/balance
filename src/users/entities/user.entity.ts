import * as argon2 from 'argon2';
import { Exclude } from 'class-transformer';
import { Account } from 'src/accounts/entities/account.entity';
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

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Exclude()
  @Column({ type: 'varchar' })
  password: string;

  @Column({ nullable: true })
  baseCurrency: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: string;

  @OneToMany(() => Account, (account) => account.user)
  accounts: Account[];

  @BeforeInsert() async hashPassword() {
    this.password = await argon2.hash(this.password);
  }

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
