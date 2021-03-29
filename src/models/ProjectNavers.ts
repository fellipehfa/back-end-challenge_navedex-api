/* eslint-disable camelcase */
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { Navers } from './Navers'
import { Projects } from './Projects'

@Entity('project_navers')
class ProjectNavers {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  project_id: string;

  @ManyToOne(() => Projects)
  @JoinColumn({ name: 'project_id' })
  project: Projects

  @Column()
  naver_id: string;

  @ManyToOne(() => Navers)
  @JoinColumn({ name: 'naver_id' })
  navers: Navers[]

  constructor () {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { ProjectNavers }
