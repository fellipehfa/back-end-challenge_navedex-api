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
            name: 'user_id',
            type: 'varchar'
          }, {

          }, {

          }
        ]
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
  }
}
