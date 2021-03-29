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

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
  })

  it('Should be able to list all navers', async () => {
    await request(app).post('/navers').send({
      naver: 'Fellipe-index',
      birthdate: '1992-06-04',
      admission_date: '2021-03-29',
      job_role: 'NewNaver'
    })

    const response = await request(app).get('/navers')

    expect(response.body.length).toBe(2)

    await naversController.delete(response.body.id)
  })

  it('Should be able to filter and show a naver', async () => {
    const addNaver = await naversController.create('Fellipe-index', null, null, 'NewNaver')

    const response = await request(app).get(`/doctor/${addNaver.id}`)
    expect(response.body.naver).toBe(addNaver.naver)
    expect(response.body.job_role).toBe(addNaver.job_role)

    await naversController.delete(addNaver.id)
  })

  it('Should be able to update a Naver', async () => {
    const addNaver = await naversController.create('Fellipe-index', new Date('1992-06-04'), new Date('2021-03-30'), 'NewNaver')

    const response = await request(app).put(`/doctor/${addNaver.id}`).send({
      name: 'Jessica Aparecida Mollo',
      cell: '11951732232'
    })
    expect(response.body.name).not.toBe(addNaver.name)
    expect(response.body.name).toBe('Jessica Aparecida Mollo')
    expect(response.body.crm).toBe(addNaver.crm)
    expect(response.body.cell).not.toBeNull()

    await naversController.delete(addNaver.id)
  })
})

// it('Soft Delete a Doctor', async () => {
//   const newNaver = await naversController.create('Maria de Fatima', 3245878, '15952733210', null)

//   const response = await request(app).delete(`/doctor/${newNaver.id}`)
//   expect(response.status).toBe(200)

//   const getDoctor = await naversController.get(newNaver.id)
//   expect(getDoctor.deleted_at).not.toBeNull()

//   await naversController.delete(newNaver.id)
// })
