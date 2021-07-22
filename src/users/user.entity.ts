import * as argon2 from 'argon2';
import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  username: string;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true
  })
  
  email: string;
  @Column({
    type: 'varchar',
    nullable: false,
  })
  password: string;


  @BeforeInsert() async hashPassword() {
    this.password = await argon2.hash(this.password);
  }
}