import express, { json } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoute from './routes/authRoute.js'
// import { nanoid } from 'nanoid'

const app = express()

app.use(cors())
app.use(json())

dotenv.config()

app.use(authRoute)

// app.post('/teste', async (req, res) => {
//    const teste = nanoid(9)
// })

app.listen(process.env.PORT)
