import { Router } from 'express'
import { UsersController } from '../controllers/UsersController'
import * as yup from 'yup'

const usersRouter = Router()
const usersController = new UsersController()

usersRouter.post('/users', async (request, response) => {
  const { email, password } = request.body

  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required()
  })

  try {
    await schema.validate(request.body, { abortEarly: false })
  } catch (err) {
    return response.status(400).json({ err: 'Error > UsersController > Validation' })
  }

  const addUser = await usersController.create(email, password)
  return response.status(200).json(addUser)
})

usersRouter.get('/users', async (request, response) => {
  const user = (request.query as any).email
  const showUser = await usersController.show(user)
  return response.status(200).json(showUser)
})

export { usersRouter }
