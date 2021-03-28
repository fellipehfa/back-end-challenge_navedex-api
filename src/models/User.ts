/* eslint-disable camelcase */
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { Navers } from './Navers'

@Entity('users')
class User {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToMany(type => Navers) // , { eager: true }
  @JoinTable({
    name: 'navers',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'naver_id', referencedColumnName: 'id' }
  })
  Team: Navers[];

  constructor () {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { User }
