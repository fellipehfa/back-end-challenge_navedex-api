import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class UsersNavers1616714599971 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users_navers',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          }, {
            name: 'user_id',
            type: 'uuid'
          }, {
            name: 'naver_id',
            type: 'uuid'
          }
        ],
        foreignKeys: [
          {
            name: 'FK_User',
            columnNames: ['user_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          }, {
            name: 'FK_Naver',
            columnNames: ['naver_id'],
            referencedTableName: 'navers',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
          }
        ]
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users_navers')
  }
}
