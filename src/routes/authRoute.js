import { Router } from 'express'
import registerValidate from '../middlewares/registerValidate.js'
import loginValidate from '../middlewares/loginValidate.js'
import { signUp, signIn } from '../controllers/authControllers.js'

const route = Router()

route.post('/signup', registerValidate, signUp)
route.post('/signin', loginValidate, signIn)

export default route
