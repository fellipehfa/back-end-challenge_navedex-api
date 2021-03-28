import { Router } from 'express'
import { UserTeamController } from '../controllers/UserTeamController'

const userTeamRouter = Router()

const userTeamController = new UserTeamController()

userTeamRouter.post('/team', userTeamController.teamMaker)

export { userTeamRouter }
