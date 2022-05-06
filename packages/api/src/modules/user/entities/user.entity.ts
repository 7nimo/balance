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
  userId: string;

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

  // @BeforeInsert()
  // async hashPassword(): Promise<void> {
  //   this.password = await argon2.hash(this.password);
  // }

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
