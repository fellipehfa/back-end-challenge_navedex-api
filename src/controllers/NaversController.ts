/* eslint-disable camelcase */
import { getCustomRepository, Like } from 'typeorm'
import { AppError } from '../error/AppError'
import { NaversRepository } from '../repositories/NaversRepository'

class NaversController {
  async create (naver: string, birthdate: Date, admission_date: Date, job_role: string) {
    const naversRepository = getCustomRepository(NaversRepository)

    const addNaver = naversRepository.create({
      naver: naver,
      birthdate: birthdate,
      admission_date: admission_date,
      job_role: job_role
    })

    return await naversRepository.save(addNaver)
  }

  async show (naver: string) {
    const naversRepository = getCustomRepository(NaversRepository)
    let showNaver = null

    if (naver) {
      showNaver = await naversRepository.find({
        naver: Like(`%${naver}%`)
      })
    } else {
      showNaver = await naversRepository.find()
    }

    if (!showNaver) {
      throw new AppError(500, 'Naver not found!', 'Error > NaversController > show')
    }
    return showNaver
  }

  async update (id: string, naver: string, birthdate: Date, admission_date: Date, job_role: string) {
    const naversRepository = getCustomRepository(NaversRepository)

    const updateNaver = await naversRepository.findOne({ id: id })

    if (updateNaver) {
      updateNaver.naver = naver != null ? naver : updateNaver.naver
      updateNaver.birthdate = birthdate != null ? birthdate : updateNaver.birthdate
      updateNaver.admission_date = admission_date != null ? admission_date : updateNaver.admission_date
      updateNaver.job_role = job_role != null ? job_role : updateNaver.job_role
      return await naversRepository.save(updateNaver)
    } else {
      throw new AppError(500, 'Could not update Naver', 'Error > NaversController > update')
    }
  }

  async delete (id: string) {
    const naversRepository = getCustomRepository(NaversRepository)

    const deleteNaver = await naversRepository.findOne({ id: id })

    if (!deleteNaver) {
      throw new AppError(500, 'Naver not found!', 'Error > NaversController > delete')
    }
    deleteNaver.deleted_at = new Date()
    await naversRepository.save(deleteNaver)
    console.log('Naver soft deleted', id)
  }
}

export { NaversController }
