import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { ProjectsRepository } from '../repositories/ProjectsRepository'

class ProjectsController {
  async create (request: Request, response: Response) {
    const { project } = request.body

    const projectsRepository = getCustomRepository(ProjectsRepository)

    const projectAlreadyExists = await projectsRepository.findOne({
      project
    })

    if (projectAlreadyExists) {
      return response.status(400).json({
        error: 'Project already exists!'
      })
    }

    const addProject = projectsRepository.create({
      project
    })

    await projectsRepository.save(addProject)

    return response.status(201).json(addProject)
  }
}

export { ProjectsController }
