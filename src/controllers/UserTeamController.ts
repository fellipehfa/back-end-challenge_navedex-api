/* eslint-disable @typescript-eslint/no-array-constructor */
/* eslint-disable no-var */
/* eslint-disable camelcase */
import { getCustomRepository } from 'typeorm'
import { UserNavers } from '../models/UserNavers'
import { NaversRepository } from '../repositories/NaversRepository'
import { UserNaversRepository } from '../repositories/UserNaversRepository'
import { UsersRepository } from '../repositories/UsersRepository'
import { AppError } from '../error/AppError'

class UserTeamController {
  async teamMaker (user_id: string, navers: string[]) {
    const usersRepository = getCustomRepository(UsersRepository)
    const naversRepository = getCustomRepository(NaversRepository)
    const userNaversRepository = getCustomRepository(UserNaversRepository)

    const userNotExists = await usersRepository.findOne({ id: user_id })
    if (!userNotExists) {
      throw new AppError(400, 'User already exist.', 'ERROR UserTeamController > teamMaker > userNotExist')
    }

    var newArray: UserNavers[] = new Array()
    for (const naver of navers) {
      const team = await naversRepository.findOne({ naver })
      if (!team) {
        throw new AppError(400, 'Could not create a team', 'Error > UserTeamController> teamMaker > newArray')
      }
      newArray.push(userNaversRepository.create({
        user_id: user_id,
        naver_id: team.id
      }))
    }
    await userNaversRepository.save(newArray)
    return await usersRepository.findOne({
      where: { id: user_id },
      relations: ['UserTeam']
    })
  }
}

export { UserTeamController }
