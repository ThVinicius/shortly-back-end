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

const PORT = process.env.PORT || 4000

app.listen(PORT, () => console.log(`Server funcionando na porta ${PORT}`))
