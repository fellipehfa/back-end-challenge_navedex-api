/* eslint-disable camelcase */
import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { NaversRepository } from '../repositories/NaversRepository'
import * as yup from 'yup'
import { AppError } from '../errors/AppError'

class NaversController {
  async create (request: Request, response: Response) {
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
      throw new AppError(err, 400)
    }

    const naversRepository = getCustomRepository(NaversRepository)

    const naverAlreadyExists = await naversRepository.findOne({
      naver
    })

    if (naverAlreadyExists) {
      throw new AppError('Naver already exists!', 400)
    }
    const addNaver = naversRepository.create({
      naver, birthdate, admission_date, job_role
    })

    await naversRepository.save(addNaver)

    return response.status(201).json(addNaver)
  }

  async index (request: Request, response: Response) {
    const naversRepository = getCustomRepository(NaversRepository)

    const all = await naversRepository.find()

    return response.json(all)
  }

  async show (request: Request, response: Response) {
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
  }
}

export { NaversController }
