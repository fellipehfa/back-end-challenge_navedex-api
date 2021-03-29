/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */
import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateUsers1616376537642 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          }, {
            name: 'email',
            type: 'varchar',
            length: '255'
          }, {
            name: 'password',
            type: 'varchar'
          }, {
            name: 'jwtToken',
            type: 'varchar',
            default: 'null',
            isNullable: true
          }, {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          }
        ]
      })
    ), true
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users')
  }
}
