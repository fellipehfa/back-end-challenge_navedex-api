import { Router } from 'express'
import { ProjectsController } from '../controllers/ProjectsController'
import * as yup from 'yup'

const projectsRouter = Router()
const projectsController = new ProjectsController()

projectsRouter.post('/projects', async (request, response) => {
  const { project } = request.body

  const schema = yup.object().shape({
    project: yup.string().required()
  })

  try {
    await schema.validate(request.body, { abortEarly: false })
  } catch (err) {
    return response.status(400).json({ err: 'Error > ProjectRouter > Validation' })
  }

  const addProject = await projectsController.create(project)
  return response.status(200).json(addProject)
})

projectsRouter.get('/projects/', async (request, response) => {
  const project = (request.query as any).project
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
