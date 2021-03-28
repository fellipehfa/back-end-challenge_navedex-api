import { Router } from 'express'
import { NaversController } from '../controllers/NaversController'

const naversRouter = Router()

const naversController = new NaversController()

naversRouter.post('/navers', naversController.create)

naversRouter.get('/navers', naversController.index)

naversRouter.get('/:naver', async (request, response) => {
  const naver = request.params.naver
  const showNaver = await naversController.show(naver)
  return response.status(200).json(showNaver)
})

naversRouter.put('/:naver', async (request, response) => {
  const naver = request.params.naver
  const showNaver = await naversController.update(naver)
  return response.status(200).json(showNaver)
})

naversRouter.delete('/:naver', async (request, response) => {
  const naver = request.params.naver
  const showNaver = await naversController.erase(naver)
  return response.status(200).json(showNaver)
})

export { naversRouter }
