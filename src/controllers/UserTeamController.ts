/* eslint-disable camelcase */
import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { NaversRepository } from '../repositories/NaversRepository'
import { UserNaversRepository } from '../repositories/UserNaversRepository'
import { UsersRepository } from '../repositories/UsersRepository'
// import * as yup from 'yup'
// import { AppError } from '../error/AppError'

class UserTeamController {
  async teamMaker (request: Request, response: Response) {
    const { naver, user_id, naver_id } = request.body

    const usersRepository = getCustomRepository(UsersRepository)
    const naversRepository = getCustomRepository(NaversRepository)
    const userNaversRepository = getCustomRepository(UserNaversRepository)

    const naverExists = await naversRepository.find({ naver })

    if (!naverExists) {
      return response.status(400).json({
        error: 'Naver does not exists!'
      })
    }

    const userNaver = userNaversRepository.create({
      user_id,
      naver_id
    })
    await userNaversRepository.save(userNaver)

    return response.status(200).json(userNaver)
  }
}

export { UserTeamController }
