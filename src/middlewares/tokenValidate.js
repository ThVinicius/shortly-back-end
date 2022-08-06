import connection from '../database/postgreSQL.js'
import tokenSchema from '../schemas/tokenSchema.js'
import jwt from 'jsonwebtoken'

export default async function tokenValidate(req, res, next) {
  const { error } = tokenSchema.validate(req.headers.authorization)

  if (error) return res.sendStatus(401)

  try {
    const { authorization } = req.headers

    const token = authorization.replace('Bearer ', '')

    const secretKey = process.env.JWT_SECRET

    const data = jwt.verify(token, secretKey)

    const { rows: customerSession } = await connection.query(
      'SELECT * FROM sessions WHERE token = $1 LIMIT 1',
      [token]
    )

    if (customerSession.length === 0) return res.sendStatus(426)

    res.locals.customerId = data.id

    next()
  } catch (error) {
    console.log(error)

    switch (error.name) {
      case 'JsonWebTokenError':
        return res.sendStatus(401)

      case 'TokenExpiredError':
        return res.sendStatus(498)

      default:
        return res.status(500).send(error)
    }
  }
}
