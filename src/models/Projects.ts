import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('projects')
class Projects {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  project: string;

  @CreateDateColumn()
  created_at: Date;

  constructor () {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { Projects }
