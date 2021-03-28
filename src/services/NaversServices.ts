import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { NaversRepository } from '../repositories/NaversRepository'
import { AppError } from '../errors/AppError'

class NaversService {
  async create (request: Request, response: Response) {
    const { naver, birthdate, admission_date, job_role } = request.body

    const naversRepository = getCustomRepository(NaversRepository)

    const naverAlreadyExists = await naversRepository.findOne({
      naver
    })

    if (naverAlreadyExists) {
      throw new AppError(400, 'Naver already exists!', 'ERROR Navers > create > naverAlreadyExists')
    }
    const addNaver = naversRepository.create({
      naver, birthdate, admission_date, job_role
    })

    await naversRepository.save(addNaver)
  }

  async get (response: Response) {
    const naversRepository = getCustomRepository(NaversRepository)

    const all = await naversRepository.find()

    return response.json(all)
  }
}

export { NaversService }
