import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { ProjectsRepository } from '../repositories/ProjectsRepository'

class ProjectsController {
  async create (request: Request, response: Response) {
    const { name } = request.body

    const projectsRepository = getCustomRepository(ProjectsRepository)

    const projectAlreadyExists = await projectsRepository.findOne({
      name
    })

    if (projectAlreadyExists) {
      return response.status(400).json({
        error: 'Project already exists!'
      })
    }

    const project = projectsRepository.create({
      name
    })

    await projectsRepository.save(project)

    return response.json(project)
  }
}

export { ProjectsController }
