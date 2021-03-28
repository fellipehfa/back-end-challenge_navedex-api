import { Router } from 'express'
import { NaversController } from '../controllers/NaversController'

const router = Router()

const naversController = new NaversController()

router.post('/navers', naversController.create)
router.get('/navers', naversController.index)
router.get('/:naver', naversController.show)
