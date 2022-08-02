import { Router } from 'express'
import tokenValidate from '../middlewares/tokenValidate.js'
import createUrlValidate from '../middlewares/createUrlValidate.js'
import { createUrl } from '../controllers/customersControllers.js'

const route = Router()

route.post('/urls/shorten', createUrlValidate, tokenValidate, createUrl)

export default route
