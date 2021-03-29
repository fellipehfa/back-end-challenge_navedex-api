import { getCustomRepository } from 'typeorm'
import { AppError } from '../error/AppError'
import { ProjectNavers } from '../models/ProjectNavers'
import { NaversRepository } from '../repositories/NaversRepository'
import { ProjectNaversRepository } from '../repositories/ProjectNaversRepository'
import { ProjectsRepository } from '../repositories/ProjectsRepository'

class ProjectNaversController {
  async create (project_id: string, navers: string[]) {
    const projectsRepository = getCustomRepository(ProjectsRepository)
    const naversRepository = getCustomRepository(NaversRepository)
    const projectNaversRepository = getCustomRepository(ProjectNaversRepository)

    const projectNotExists = await projectsRepository.findOne({ id: project_id })
    if (projectNotExists) {
      throw new AppError(400, 'User already exist.', 'ERROR UserTeamController > teamMaker > userNotExist')
    }

    const newArray: ProjectNavers[] = []
    for (const naver of navers) {
      const project = await naversRepository.findOne({ naver })
      if (!project) {
        throw new AppError(400, 'Could not create a project', 'Error > UserTeamController> teamMaker > newArray')
      }
      newArray.push(projectNaversRepository.create({
        project_id: project_id,
        naver_id: project.id
      }))
    }
  }
}

export { ProjectNaversController }
