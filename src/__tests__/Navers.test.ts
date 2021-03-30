import request from 'supertest'
import { app } from '../app'
import createConnection from '../database/connection'
import { NaversController } from '../controllers/NaversController'

const naversController = new NaversController()

describe('Navers test', () => {
  beforeAll(async () => {
    const connection = await createConnection()
    await connection.runMigrations()
  })

  it('Should be able to create a new naver!', async () => {
    const response = await request(app).post('/navers').send({
      naver: 'Fellipe-create',
      birthdate: '1992-06-04',
      admission_date: '2021-03-29',
      job_role: 'NewNaver'
    })

    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('id')

    await naversController.delete(response.body.id)
  })

  // it('Should be able to filter and show a naver', async () => {
  //   const addNaver = await naversController.create('Fellipe-index', new Date('1992-06-04'), new Date('2021-03-30'), 'NewNaver')

  //   const response = await naversController.show()
  //   expect(response.body.naver).toBe(addNaver.naver)
  //   expect(response.body.job_role).toBe(addNaver.job_role)

  //   await naversController.delete(addNaver.id)
  // })

  it('Should be able to update a Naver', async () => {
    const addNaver = await naversController.create('Fellipe', new Date('1992-06-04'), new Date('2021-03-30'), 'NewNaver')

    const response = await request(app).put(`/navers/${addNaver.id}`).send({
      naver: 'Fellipe-Updated',
      birthdate: '1992-06-04',
      admission_date: '2021-03-29',
      job_role: 'New Naver Junior'
    })
    expect(response.body.naver).not.toBe(addNaver.naver)
    expect(response.body.naver).toBe('Fellipe-Updated')
    expect(response.body.birthdate).not.toBe(addNaver.birthdate)
    expect(response.body.birthdate).toBe('1992-06-04')
    expect(response.body.admission_date).not.toBe(addNaver.admission_date)
    expect(response.body.admission_date).toBe('2021-03-29')
    expect(response.body.job_role).not.toBe(addNaver.job_role)
    expect(response.body.job_role).toBe('New Naver Junior')

    await naversController.delete(addNaver.id)
  })

  // it('Should be able to soft delete a Naver', async () => {
  //   const newNaver = await naversController.create('Fellipe-deleted', new Date('1992-06-04'), new Date('2021-03-30'), 'NewNaver')

  //   const response = await request(app).delete(`/navers/${newNaver.id}`)
  //   expect(response.status).toBe(200)

  //   const getNaver = await naversController.show(newNaver.naver)
  //   expect(getNaver.deleted_at).not.toBeNull()

  //   await naversController.delete(newNaver.id)
  // })
})
