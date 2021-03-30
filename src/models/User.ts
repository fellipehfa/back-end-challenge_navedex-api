/* eslint-disable no-extra-boolean-cast */
/* eslint-disable camelcase */
import * as bcrypt from 'bcrypt'
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { Navers } from './Navers'

@Entity('users')
class User {
  @PrimaryColumn()
  readonly id: string;

  @Column()
  email: string;

  @Column()
  public password: string;

  // @Column()
  // public token: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword (): Promise<void> {
    if (!!this.password) {
      this.password = await bcrypt.hash(this.password, 10)
    }
  }

  @CreateDateColumn()
  created_at: Date;

  @ManyToMany(type => Navers) // , { eager: true }
  @JoinTable({
    name: 'users_navers',
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'naver_id', referencedColumnName: 'id' }
  })
  navers: Navers[];

  constructor () {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

export { User }
