import { Router } from 'express'
import { ProjectsController } from '../controllers/ProjectsController'
import { UsersController } from '../controllers/UsersController'
import { UserTeamController } from '../controllers/UserTeamController'
import { ProjectNaversController } from '../controllers/ProjectNaversController'

const router = Router()

const usersController = new UsersController()
const projectsController = new ProjectsController()
const userTeamController = new UserTeamController()
const projectNaversController = new ProjectNaversController()

router.post('/users', usersController.create)

router.post('/projects', projectsController.create)
// router.get('/projects', projectsController.index)
// router.get('/projects/:name', projectsController.show)

router.post('/team', userTeamController.teamMaker)

// router.post('/project-navers', projectNaversController.create)

export { router }
