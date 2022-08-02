import express, { json } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoute from './routes/authRoute.js'
import customersRoute from './routes/customersRoute.js'

const app = express()

app.use(cors())
app.use(json())

dotenv.config()

app.use(authRoute)
app.use(customersRoute)

app.listen(process.env.PORT)
