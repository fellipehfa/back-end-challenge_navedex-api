/* eslint-disable camelcase */
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { Navers } from './Navers'

@Entity('projects')
class Projects {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  project: string;

  @CreateDateColumn()
  created_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @ManyToMany(type => Navers) // , { eager: true }
  @JoinTable({
    name: 'navers',
    joinColumn: { name: 'project_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'naver_id', referencedColumnName: 'id' }
  })
  Team: Navers[];

  constructor () {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { Projects }
