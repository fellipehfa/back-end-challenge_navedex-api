import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateNavers1616379582730 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'navers',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          }, {
            name: 'naver',
            type: 'varchar',
            length: '255'
          }, {
            name: 'birthdate',
            type: 'date'
          }, {
            name: 'admission_date',
            type: 'date'
          }, {
            name: 'job_role',
            type: 'varchar'
          },
          {
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
