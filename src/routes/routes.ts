import { Router } from 'express'
import { NaversController } from '../controllers/NaversController'
import { ProjectsController } from '../controllers/ProjectsController'
import { UsersController } from '../controllers/UsersController'
import { UserTeamController } from '../controllers/UserTeamController'

const router = Router()

const usersController = new UsersController()
const naversController = new NaversController()
const projectsController = new ProjectsController()
const userTeamController = new UserTeamController()

router.post('/users', usersController.create)

router.post('/navers', naversController.create)
router.get('/navers', naversController.index)
// router.get('/navers/:name', naversController.show)

router.post('/projects', projectsController.create)
// router.get('/projects', projectsController.index)
// router.get('/projects/:name', projectsController.show)

router.post('/team', userTeamController.teamMaker)

export { router }
