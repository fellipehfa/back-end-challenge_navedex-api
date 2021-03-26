import { Router } from 'express'
import { NaversController } from '../controllers/NaversController'
import { ProjectsController } from '../controllers/ProjectsController'
import { UsersController } from '../controllers/UsersController'

const router = Router()

const usersController = new UsersController()
const naversController = new NaversController()
const projectsController = new ProjectsController()

router.post('/users', usersController.create)

router.post('/navers', naversController.create)

router.post('/projects', projectsController.create)

export { router }
