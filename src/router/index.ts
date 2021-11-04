import {Router} from 'express'
import userController from '../controllers/userController.js'
import ImgController from '../controllers/imgController.js'
import multer from 'multer'
const upload = multer()

const router: Router = Router()

router.post('/registration', userController.registration)
router.post('/login', userController.login)

router.get('/user/:username', userController.getUser)
router.get('/users', userController.getAllUsers)

router.get('/img/:key', ImgController.getImg)
router.post('/img', upload.any(), ImgController.postImg)

export default router