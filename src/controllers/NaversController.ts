/* eslint-disable camelcase */
import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { NaversRepository } from '../repositories/NaversRepository'
import * as yup from 'yup'
import { AppError } from '../error/AppError'

class NaversController {
  async create (request: Request, response: Response) {
    const { naver, birthdate, admission_date, job_role } = request.body

    const schema = yup.object().shape({
      naver: yup.string().required(),
      birthdate: yup.string().required(),
      admission_date: yup.string().required(),
      job_role: yup.string().required()
    })

    try {
      await schema.validate(request.body, { abortEarly: false })
    } catch (err) {
      throw new AppError(400, err, 'Error > NaverController > Validation')
    }

    const naversRepository = getCustomRepository(NaversRepository)

    const addNaver = naversRepository.create({
      naver, birthdate, admission_date, job_role
    })

    await naversRepository.save(addNaver)

    return response.status(201).json(addNaver)
  }

  async index (request: Request, response: Response) {
    const naversRepository = getCustomRepository(NaversRepository)

    const all = await naversRepository.find()

    return response.json(all)
  }

  async show (request) {
    const { naver } = request.query

    const naversRepository = getCustomRepository(NaversRepository)

    const showNaver = await naversRepository.find({
      where: { naver }
    })

    if (!showNaver) {
      throw new AppError(500, 'Naver not found!', 'Error > NaversController > show')
    } return showNaver
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
    } else {
      deleteNaver.deleted_at = new Date()
      await naversRepository.save(deleteNaver)
      console.log('Naver soft deleted', deleteNaver)
    }
  }
}

export { NaversController }
