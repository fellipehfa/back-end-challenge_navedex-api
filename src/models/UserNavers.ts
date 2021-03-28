/* eslint-disable camelcase */
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { Navers } from './Navers'
import { User } from './User'

@Entity('user_navers')
class UserNavers {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User

  @Column()
  naver_id: string;

  @ManyToOne(() => Navers)
  @JoinColumn({ name: 'naver_id' })
  naver: Navers

  constructor () {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { UserNavers }
