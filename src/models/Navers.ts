/* eslint-disable camelcase */
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { Projects } from './Projects'

@Entity('navers')
class Navers {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  naver: string;

  @Column()
  birthdate: Date;

  @Column()
  admission_date: Date;

  @Column()
  job_role: string;

  @CreateDateColumn()
  created_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @ManyToMany(type => Projects) // , { eager: true }
  @JoinTable({
    name: 'project_navers',
    joinColumn: { name: 'naver_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'project_id', referencedColumnName: 'id' }
  })
  projects: Projects[];

  constructor () {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { Navers }
