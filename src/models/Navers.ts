import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('navers')
class Navers {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  name: string;

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

  constructor () {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { Navers }
