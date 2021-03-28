import { Router } from 'express'
import { ProjectsController } from '../controllers/ProjectsController'

const projectsRouter = Router()

const projectsController = new ProjectsController()

projectsRouter.post('/projects', projectsController.create)

// router.get('/projects', projectsController.index)

// router.get('/projects/:name', projectsController.show)

export { projectsRouter }
