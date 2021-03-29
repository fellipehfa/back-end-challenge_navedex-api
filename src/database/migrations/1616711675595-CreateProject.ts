/* eslint-disable no-sequences */
/* eslint-disable no-unused-expressions */
import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateProject1616711675595 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'projects',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          }, {
            name: 'project',
            type: 'varchar'
          }, {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          }, {
            name: 'deleted_at',
            type: 'timestamp',
            default: 'null',
            isNullable: true
          }
        ]
      })
    ), true
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('projects')
  }
}
