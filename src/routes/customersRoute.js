import { Router } from 'express'
import tokenValidate from '../middlewares/tokenValidate.js'
import createUrlValidate from '../middlewares/createUrlValidate.js'
import idParamsValidate from '../middlewares/idParamsValidate.js'
import shortUrlParamsValidate from '../middlewares/shortUrlParamsValidate.js'
import {
  createUrl,
  getUrlById,
  openUrl,
  deleteUrl,
  getUrlsByCustomer,
  getRanking
} from '../controllers/customersControllers.js'

const route = Router()

route.post('/urls/shorten', createUrlValidate, tokenValidate, createUrl)
route.get('/urls/:id', idParamsValidate, getUrlById)
route.get('/urls/open/:shortUrl', shortUrlParamsValidate, openUrl)
route.delete('/urls/:id', idParamsValidate, tokenValidate, deleteUrl)
route.get('/users/me', tokenValidate, getUrlsByCustomer)
route.get('/ranking', getRanking)

export default route
