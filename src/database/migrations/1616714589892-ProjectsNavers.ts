/* eslint-disable no-unused-expressions */
/* eslint-disable no-sequences */
import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class ProjectsNavers1616714589892 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'project_navers',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          }, {
            name: 'project_id',
            type: 'uuid'
          }, {
            name: 'naver_id',
            type: 'uuid'
          }
        ],
        foreignKeys: [
          {
            name: 'FK_Project',
            columnNames: ['project_id'],
            referencedTableName: 'projects',
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
    ), true
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('project_navers')
  }
}
