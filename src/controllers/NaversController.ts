import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { NaversRepository } from '../repositories/NaversRepository'

class NaversController {
  async create (request: Request, response: Response) {
    const { name, birthdate, admission_date, job_role } = request.body

    const naversRepository = getCustomRepository(NaversRepository)

    const naverAlreadyExists = await naversRepository.findOne({
      name
    })

    if (naverAlreadyExists) {
      return response.status(400).json({
        error: 'Naver already exists!'
      })
    }
    const naver = naversRepository.create({
      name, birthdate, admission_date, job_role
    })

    await naversRepository.save(naver)

    return response.json(naver)
  }
}

export { NaversController }
