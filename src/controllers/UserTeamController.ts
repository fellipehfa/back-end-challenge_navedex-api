/* eslint-disable camelcase */
import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { AppError } from '../errors/AppError'
import { NaversRepository } from '../repositories/NaversRepository'
import { UserNaversRepository } from '../repositories/UserNaversRepository'
import { UsersRepository } from '../repositories/UsersRepository'

class UserTeamController {
  async teamMaker (request: Request, response: Response) {
    const { naver, user_id, naver_id } = request.body

    const userRepository = getCustomRepository(UsersRepository)
    const naversRepository = getCustomRepository(NaversRepository)
    const userNaversRepository = getCustomRepository(UserNaversRepository)

    const naverAlreadyExists = await naversRepository.findOne({ naver })
    if (!naverAlreadyExists) {
      throw new AppError('Naver does not exists!', 400)
    }
    const userNaver = userNaversRepository.create({
      user_id,
      naver_id
    })
    await userNaversRepository.save(userNaver)

    return response.json(userNaver)
  }
}

export { UserTeamController }
