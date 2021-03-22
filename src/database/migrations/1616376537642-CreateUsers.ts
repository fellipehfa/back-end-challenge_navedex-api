import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateUsers1616376537642 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true
          }, {
            name: 'email',
            type: 'varchar'
          }, {
            name: 'password',
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
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('navers')
  }
}
