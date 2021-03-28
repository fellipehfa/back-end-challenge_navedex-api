import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { AppError } from '../errors/AppError'
import { UsersRepository } from '../repositories/UsersRepository'

class UsersController {
  async create (request: Request, response: Response) {
    const { email, password } = request.body

    const usersRepository = getCustomRepository(UsersRepository)

    const userAlreadyExists = await usersRepository.findOne({
      email
    })

    if (userAlreadyExists) {
      throw new AppError('User already exists', 400)
    }

    const user = usersRepository.create({
      email, password
    })

    await usersRepository.save(user)

    return response.status(201).json(user)
  }
}

export { UsersController }
