import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import sessionsRepositories from '../repositories/sessionsRepositories.js'
import customerRepositories from '../repositories/customerRepositories.js'

export async function signUp(req, res) {
  try {
    const { name, email, password } = req.body

    const cryptPassword = bcrypt.hashSync(password, 10)

    customerRepositories.insert(name, email, cryptPassword)

    return res.sendStatus(201)
  } catch (error) {
    console.log(error)

    if (error.code === '23505') return res.status(409).send(error.detail)

    return res.status(500).send(error.detail)
  }
}

export async function signIn(_, res) {
  try {
    const { customer } = res.locals

    const secretKey = process.env.JWT_SECRET

    const config = { expiresIn: 60 * 60 * 24 * 30 }

    const token = jwt.sign(customer, secretKey, config)

    await sessionsRepositories.insert(customer.id, token)

    return res.status(200).send(token)
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}
