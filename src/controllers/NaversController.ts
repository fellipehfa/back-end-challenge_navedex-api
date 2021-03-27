/* eslint-disable camelcase */
import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { NaversRepository } from '../repositories/NaversRepository'

class NaversController {
  async create (request: Request, response: Response) {
    const { naver, birthdate, admission_date, job_role } = request.body

    const naversRepository = getCustomRepository(NaversRepository)

    const naverAlreadyExists = await naversRepository.findOne({
      naver
    })

    if (naverAlreadyExists) {
      return response.status(400).json({
        error: 'Naver already exists!'
      })
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

  // async show (request: Request, response: Response) {
  //   const naversRepository = getCustomRepository(NaversRepository)

  //   const showNaver = await naversRepository.findOne({
  //     where: { name: request },
  //     relations: ['navers']
  //   })
  //   if (showNaver) {
  //     return response.status(200).json(showNaver)
  //   } else {
  //     return response.status(500).json({
  //       error: 'Naver not exists!'
  //     })
  //   }
  // }
}

export { NaversController }
