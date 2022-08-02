import loginSchema from '../schemas/loginSchema.js'
import connection from '../database/postgreSQL.js'
import bcrypt from 'bcrypt'

export default async function loginValidate(req, res, next) {
  const { error } = loginSchema.validate(req.body)

  if (error) return res.sendStatus(400)

  try {
    const { email, password } = req.body

    const { rows: customer } = await connection.query(
      'SELECT * FROM customers WHERE email = $1 LIMIT 1',
      [email]
    )

    if (customer.length === 0) return res.sendStatus(401)

    const compare = bcrypt.compareSync(password, customer[0].password)

    if (!compare) return res.sendStatus(401)

    res.locals.customer = customer[0]

    next()
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}
