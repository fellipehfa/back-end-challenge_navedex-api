import { Router } from 'express'
import { ProjectNaversController } from '../controllers/ProjectNaversController'

const projectNaversRouter = Router()
const projectNaversController = new ProjectNaversController()

projectNaversRouter.post('/projects/:id/navers', async (request, response) => {
  const project_id: string = request.params.id
  const { naver_id } = request.body

  const addDocSpecialization = await projectNaversController.create(project_id, naver_id)
  return response.status(201).json(addDocSpecialization)
})

export { projectNaversRouter }
