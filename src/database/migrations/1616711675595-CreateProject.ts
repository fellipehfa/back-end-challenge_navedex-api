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
            name: 'name',
            type: 'varchar'
          }, {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          }
        ]
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('projects')
  }
}
