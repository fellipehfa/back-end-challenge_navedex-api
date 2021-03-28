import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { UsersRepository } from '../repositories/UsersRepository'
import * as yup from 'yup'
import { AppError } from '../error/AppError'

class UsersController {
  async create (request: Request, response: Response) {
    const { email, password } = request.body

    const schema = yup.object().shape({
      email: yup.string().email().required(),
      password: yup.string().required()
    })

    try {
      await schema.validate(request.body, { abortEarly: false })
    } catch (err) {
      throw new AppError(400, err, 'Error > UsersController > Validation')
    }

    const usersRepository = getCustomRepository(UsersRepository)

    const userAlreadyExists = await usersRepository.findOne({
      email
    })

    if (userAlreadyExists) {
      throw new AppError(400, 'User already exists!', 'Error > UsersController > userAlreadyExists')
    }

    const user = usersRepository.create({
      email, password
    })

    await usersRepository.save(user)

    return response.status(201).json(user)
  }
}

export { UsersController }
