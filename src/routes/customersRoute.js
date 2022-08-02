import { Router } from 'express'
import tokenValidate from '../middlewares/tokenValidate.js'
import createUrlValidate from '../middlewares/createUrlValidate.js'
import idParamsValidate from '../middlewares/idParamsValidate.js'
import { createUrl, getUrlById } from '../controllers/customersControllers.js'

const route = Router()

route.post('/urls/shorten', createUrlValidate, tokenValidate, createUrl)
route.get('/urls/:id', idParamsValidate, getUrlById)

export default route
