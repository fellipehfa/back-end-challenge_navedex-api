/* eslint-disable camelcase */
import { Router } from 'express'
import { NaversController } from '../controllers/NaversController'
import * as yup from 'yup'

const naversRouter = Router()
const naversController = new NaversController()

naversRouter.post('/navers', async (request, response) => {
  const { naver, birthdate, admission_date, job_role } = request.body

  const schema = yup.object().shape({
    naver: yup.string().required(),
    birthdate: yup.string().required(),
    admission_date: yup.string().required(),
    job_role: yup.string().required()
  })

  try {
    await schema.validate(request.body, { abortEarly: false })
  } catch (err) {
    return response.status(400).json({ err: 'Error > NaverRouter > Validation' })
  }

  const addNaver = await naversController.create(naver, birthdate, admission_date, job_role)
  return response.status(200).json(addNaver)
})

naversRouter.get('/navers', async (request, response) => {
  const naver = request.query.naver
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
