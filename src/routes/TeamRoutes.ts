/* eslint-disable camelcase */
import { Router } from 'express'
import { UserTeamController } from '../controllers/UserTeamController'

const userTeamRouter = Router()
const userTeamController = new UserTeamController()

userTeamRouter.post('/users/:id/team', async (request, response) => {
  const user_id: string = request.params.id
  const { navers_id } = request.body

  const addDocSpecialization = await userTeamController.teamMaker(user_id, navers_id)
  return response.status(201).json(addDocSpecialization)
})

export { userTeamRouter }
