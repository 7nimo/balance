import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('bank')
export class BankEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
