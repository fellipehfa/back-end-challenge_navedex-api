import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { ProjectsRepository } from '../repositories/ProjectsRepository'
import * as yup from 'yup'
import { AppError } from '../error/AppError'

class ProjectsController {
  async create (request: Request, response: Response) {
    const { project } = request.body

    const schema = yup.object().shape({
      project: yup.string().required()
    })

    try {
      await schema.validate(request.body, { abortEarly: false })
    } catch (err) {
      throw new AppError(400, err, 'Error > ProjectsController > Validation')
    }

    const projectsRepository = getCustomRepository(ProjectsRepository)

    const projectAlreadyExists = await projectsRepository.findOne({
      project
    })

    if (projectAlreadyExists) {
      throw new AppError(400, 'Project already exists!', 'Error > ProjectsController > projectAlreadyExists')
    }

    const addProject = projectsRepository.create({
      project
    })

    await projectsRepository.save(addProject)

    return response.status(201).json(addProject)
  }
}

export { ProjectsController }
