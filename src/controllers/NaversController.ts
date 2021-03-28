/* eslint-disable camelcase */
import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { NaversRepository } from '../repositories/NaversRepository'
import * as yup from 'yup'
import { AppError } from '../error/AppError'
import { relative } from 'node:path'

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
      throw new AppError(400, err, 'Error > NaverController > Validation')
    }

    const naversRepository = getCustomRepository(NaversRepository)

    const naverAlreadyExists = await naversRepository.findOne({
      naver
    })

    if (naverAlreadyExists) {
      throw new AppError(400, 'Naver already exists!', 'Error > NaversController > naverAlreadyExists')
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

  async show (naver: string) {
    const naversRepository = getCustomRepository(NaversRepository)

    const findNaver = await naversRepository.find({
      where: { naver }
    })

    if (findNaver) {
      return findNaver
    } else {
      throw new AppError(500, 'Naver does not found!', 'Error > NaversController > show')
    }
  }

  async update (naver: string) {
    const naversRepository = getCustomRepository(NaversRepository)

    const findNaver = await naversRepository.find({
      where: { naver }
    })

    if (findNaver) {
      return findNaver
    } else {
      throw new AppError(500, 'Naver does not found!', 'Error > NaversController > update')
    }
  }

  async erase (naver: string) {
    const naversRepository = getCustomRepository(NaversRepository)

    const findNaver = await naversRepository.find({
      where: { naver }
    })

    if (findNaver) {
      return findNaver
    } else {
      throw new AppError(500, 'Naver does not found!', 'Error > NaversController > delete')
    }
  }
}

export { NaversController }
