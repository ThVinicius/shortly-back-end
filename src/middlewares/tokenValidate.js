import connection from '../database/postgreSQL.js'
import tokenSchema from '../schemas/tokenSchema.js'

export default function tokenValidate(req, res, next) {
  const { error } = tokenSchema.validate(req.headers)

  if (error) return res.sendStatus(400)
  try {
    const { authorization } = req.headers

    const token = authorization.replace('Bearer ', '')

    const { rows: customerSession } = connection.query(
      'SELECT * FROM sessions WHERE token = $1',
      [token]
    )

    if (customerSession.length === 0) return res.sendStatus(404)

    next()
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}
