import connection from '../database/postgreSQL.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export async function signUp(req, res) {
  try {
    const { name, email, password } = req.body

    const cryptPassword = bcrypt.hashSync(password, 10)

    await connection.query(
      'INSERT INTO customers (name, email, password) VALUES ($1, $2, $3)',
      [name, email, cryptPassword]
    )

    return res.sendStatus(201)
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}

export async function signIn(_, res) {
  try {
    const { customer } = res.locals

    const secretKey = process.env.JWT_SECRET

    const token = jwt.sign(customer, secretKey)

    console.log(token)

    await connection.query(
      `INSERT INTO 
        sessions (customer_id, token) VALUES ($1, $2) 
        ON CONFLICT (customer_id) 
        DO UPDATE SET token = EXCLUDED.token`,
      [customer.id, token]
    )

    return res.status(200).send(token)
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}
