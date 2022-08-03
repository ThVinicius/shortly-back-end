import connection from '../database/postgreSQL.js'
import tokenSchema from '../schemas/tokenSchema.js'

export default async function tokenValidate(req, res, next) {
  const { error } = tokenSchema.validate(req.headers.authorization)

  if (error) {
    switch (error.details[0].message) {
      case '"value" is required':
        return res.sendStatus(401)

      default:
        return res.status(422).send(error.details[0].message)
    }
  }

  try {
    const { authorization } = req.headers

    const token = authorization.replace('Bearer ', '')

    const { rows: customerSession } = await connection.query(
      'SELECT * FROM sessions WHERE token = $1 LIMIT 1',
      [token]
    )

    if (customerSession.length === 0) return res.sendStatus(404)

    res.locals.customerId = customerSession[0].customerId

    next()
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}
