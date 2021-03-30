/* eslint-disable camelcase */
import { Column, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('project_navers')
class ProjectNavers {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  project_id: string;

  @Column()
  naver_id: string;

  constructor () {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { ProjectNavers }
