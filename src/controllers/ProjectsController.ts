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

  async index (request: Request, response: Response) {
    const projectsRepository = getCustomRepository(ProjectsRepository)

    const all = await projectsRepository.find()

    return response.json(all)
  }

  async show (request) {
    const { project } = request.query

    const projectsRepository = getCustomRepository(ProjectsRepository)

    const showProject = await projectsRepository.find({
      where: { project }
    })

    if (!showProject) {
      throw new AppError(500, 'Project not found!', 'Error > ProjectsController > show')
    } return showProject
  }

  async update (id: string, project: string) {
    const projectsRepository = getCustomRepository(ProjectsRepository)

    const updateProject = await projectsRepository.findOne({ id: id })

    if (updateProject) {
      updateProject.project = project != null ? project : updateProject.project
      return await projectsRepository.save(updateProject)
    } else {
      throw new AppError(500, 'Could not update project!', 'Error > ProjectsController > update')
    }
  }

  async delete (id: string) {
    const projectsRepository = getCustomRepository(ProjectsRepository)

    const deleteProject = await projectsRepository.findOne({ id: id })

    if (!deleteProject) {
      throw new AppError(500, 'Naver not found!', 'Error > NaversController > delete')
    } else {
      deleteProject.deleted_at = new Date()
      await projectsRepository.save(deleteProject)
      console.log('Naver soft deleted', deleteProject)
    }
  }
}

export { ProjectsController }
