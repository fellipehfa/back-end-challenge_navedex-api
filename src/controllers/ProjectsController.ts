import { getCustomRepository, Like } from 'typeorm'
import { ProjectsRepository } from '../repositories/ProjectsRepository'
import { AppError } from '../error/AppError'

class ProjectsController {
  async create (project: string) {
    const projectsRepository = getCustomRepository(ProjectsRepository)

    const projectAlreadyExists = await projectsRepository.findOne({
      project
    })

    if (projectAlreadyExists) {
      throw new AppError(400, 'Project already exists!', 'Error > ProjectsController > projectAlreadyExists')
    }
    const addProject = projectsRepository.create({
      project: project
    })

    return await projectsRepository.save(addProject)
  }

  async show (project: string) {
    const projectsRepository = getCustomRepository(ProjectsRepository)
    let showProject = null

    if (project) {
      showProject = await projectsRepository.find({
        project: Like(`%${project}%`)
      })
    } else {
      showProject = await projectsRepository.find()
    }

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
