/* eslint-disable camelcase */
import { Column, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('users_navers')
class UserNavers {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  user_id: string;

  @Column()
  naver_id: string;

  constructor () {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { UserNavers }
