import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { UsersRepository } from '../repositories/UsersRepository'

class UsersController {
  async create (request: Request, response: Response) {
    const { email, password } = request.body

    const usersRepository = getCustomRepository(UsersRepository)

    const userAlreadyExists = await usersRepository.findOne({
      email
    })

    if (userAlreadyExists) {
      return response.status(400).json({
        error: 'User already exists!'
      })
    }

    const user = usersRepository.create({
      email, password
    })

    await usersRepository.save(user)

    return response.json(user)
  }
}

export { UsersController }
