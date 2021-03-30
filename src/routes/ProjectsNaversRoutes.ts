/* eslint-disable camelcase */
import { Router } from 'express'
import { ProjectNaversController } from '../controllers/ProjectNaversController'

const projectNaversRouter = Router()
const projectNaversController = new ProjectNaversController()

projectNaversRouter.post('/projects/:id/projectnavers', async (request, response) => {
  const project_id: string = request.params.id
  const { navers_id } = request.body

  const addNavers = await projectNaversController.create(project_id, navers_id)
  return response.status(201).json(addNavers)
})

export { projectNaversRouter }
