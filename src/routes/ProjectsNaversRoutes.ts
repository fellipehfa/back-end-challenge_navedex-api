import { Router } from 'express'
import { ProjectNaversController } from '../controllers/ProjectNaversController'

const projectNaversRouter = Router()

const projectNaversController = new ProjectNaversController()

// projectsRouter.post('/projects', projectsController.create)

// router.get('/projects', projectsController.index)

// router.get('/projects/:name', projectsController.show)

export { projectNaversRouter }
