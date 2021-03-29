/* eslint-disable camelcase */
import { Router } from 'express'
import { NaversController } from '../controllers/NaversController'

const naversRouter = Router()
const naversController = new NaversController()

naversRouter.post('/navers', naversController.create)

naversRouter.get('/navers', naversController.index)

naversRouter.get('/navers/', async (request, response) => {
  const naver = request.query
  const showNaver = await naversController.show(naver)
  return response.status(200).json(showNaver)
})

naversRouter.put('/navers/:id', async (request, response) => {
  const id: string = request.params.id
  const { naver, birthdate, admission_date, job_role } = request.body
  const updateNaver = await naversController.update(id, naver, birthdate, admission_date, job_role)
  return response.status(200).json(updateNaver)
})

naversRouter.delete('/navers/:id', async (request, response) => {
  const id: string = request.params.id
  await naversController.delete(id)
  return response.status(200).send()
})

export { naversRouter }
