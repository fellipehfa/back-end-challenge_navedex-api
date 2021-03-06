import { getCustomRepository } from 'typeorm'
import { UsersRepository } from '../repositories/UsersRepository'
import { AppError } from '../error/AppError'

class UsersController {
  async create (email: string, password: string) {
    const usersRepository = getCustomRepository(UsersRepository)

    const userAlreadyExists = await usersRepository.findOne({
      email
    })

    if (userAlreadyExists) {
      throw new AppError(400, 'User already exists!', 'Error > UsersController > userAlreadyExists')
    }
    const addUser = usersRepository.create({
      email: email,
      password: password
    })

    return await usersRepository.save(addUser)
  }

  async login (email: string) {
    const usersRepository = getCustomRepository(UsersRepository)
    let showUser = null

    if (email) {
      showUser = await usersRepository.findOne({
        where: { email: email },
        relations: ['navers']
      })
    } else {
      showUser = await usersRepository.find({
        relations: ['navers']
      })
    }

    if (!showUser) {
      throw new AppError(500, 'User not found!', 'Error > UsersController > show')
    } return showUser
  }
}

export { UsersController }
