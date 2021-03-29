import { Router } from 'express'
import { ProjectsController } from '../controllers/ProjectsController'

const projectsRouter = Router()
const projectsController = new ProjectsController()

projectsRouter.post('/projects', projectsController.create)

projectsRouter.get('/projects', projectsController.index)

projectsRouter.get('/projects/', async (request, response) => {
  const project = request.query
  const showProject = await projectsController.show(project)
  return response.status(200).json(showProject)
})

projectsRouter.put('/projects/:id', async (request, response) => {
  const id: string = request.params.id
  const { project } = request.body
  const updateProject = await projectsController.update(id, project)
  return response.status(200).json(updateProject)
})

projectsRouter.delete('/projects/:id', async (request, response) => {
  const id: string = request.params.id
  await projectsController.delete(id)
  return response.status(200).send()
})

export { projectsRouter }
