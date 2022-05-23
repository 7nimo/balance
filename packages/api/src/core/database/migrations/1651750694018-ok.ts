import { MigrationInterface, QueryRunner } from 'typeorm';

export class ok1651750694018 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    console.log(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
