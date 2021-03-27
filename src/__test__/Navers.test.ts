import request from 'supertest'
import { app } from '../app'

import createConnection from '../database/connection'

describe('Navers test', () => {
  beforeAll(async () => {
    const connection = await createConnection()
    await connection.runMigrations()
  })

  it('Should be able to create a new naver!', async () => {
    const response = await request(app).post('/navers').send({
      name: 'testName',
      birthdate: 'testBirthday',
      admission_date: 'testAdmission',
      job_role: 'testJob'
    })

    expect(response.status).toBe(201)
  })
})
