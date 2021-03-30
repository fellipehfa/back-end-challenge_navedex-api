/* eslint-disable camelcase */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-array-constructor */
import { getCustomRepository } from 'typeorm'
import { ProjectNavers } from '../models/ProjectNavers'
import { NaversRepository } from '../repositories/NaversRepository'
import { ProjectNaversRepository } from '../repositories/ProjectNaversRepository'
import { ProjectsRepository } from '../repositories/ProjectsRepository'
import { AppError } from '../error/AppError'

class ProjectNaversController {
  async create (project_id: string, navers: string[]) {
    const projectsRepository = getCustomRepository(ProjectsRepository)
    const naversRepository = getCustomRepository(NaversRepository)
    const projectsNaversRepository = getCustomRepository(ProjectNaversRepository)

    const projectNotExists = await projectsRepository.findOne({ id: project_id })
    if (!projectNotExists) {
      throw new AppError(400, 'Project does not exist.', 'ERROR ProjectNaversController > create > projectNotExist')
    }

    var newArray: ProjectNavers[] = new Array()
    for (const naver_id of navers) {
      const naver = await naversRepository.findOne({
        where: { id: naver_id }
      })

      if (!naver) {
        throw new AppError(400, 'Could not create a naver', 'Error > ProjectNaversController> create > newArray')
      }

      newArray.push(projectsNaversRepository.create({
        project_id: project_id,
        naver_id: naver.id
      }))
    }
    await projectsNaversRepository.save(newArray)
    return await projectsRepository.findOne({
      where: { id: project_id },
      relations: ['navers']
    })
  }
}

export { ProjectNaversController }
