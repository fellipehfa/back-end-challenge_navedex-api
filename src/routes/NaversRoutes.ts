import { Router, Request, Response } from 'express'
import { NaversService } from '../services/NaversServices'
import * as yup from 'yup'

const router = Router()

const naversService = new NaversService()

router.post('/navers', async (request: Request, response: Response) => {
  const { naver, birthdate, admission_date, job_role } = request.body

  const schema = yup.object().shape({
    naver: yup.string().required(),
    birthdate: yup.string().required(),
    admission_date: yup.string().required(),
    job_role: yup.string().required()
  })

  try {
    await schema.validate(request.body, { abortEarly: false })
  } catch (error) {
    return response.status(400).json({ error: error.error[0] })
  }

  const newNaver = await naversService.create(naver, birthdate, admission_date, job_role)
  return response.status(201).json(newNaver)
})

router.get('/navers', async (request: Request, response: Response) => {
  const all = await naversService.find()

  return response.json(all)
})

router.get('/:naver', async (request: Request, response: Response) => {
  const naver = request.params.naver
  const naversRepository = getCustomRepository(NaversRepository)
  const showNaver = await naversRepository.find({
    where: { naver }
  })

  if (showNaver) {
    return response.status(200).json(showNaver)
  } else {
    throw new AppError('Naver does not exists!', 500)
  }
})
