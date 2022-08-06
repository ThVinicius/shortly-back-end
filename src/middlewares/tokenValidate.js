import jwt from 'jsonwebtoken'
import tokenSchema from '../schemas/tokenSchema.js'
import sessionsRepositories from '../repositories/sessionsRepositories.js'

export default async function tokenValidate(req, res, next) {
  const { error } = tokenSchema.validate(req.headers.authorization)

  if (error) return res.sendStatus(401)

  try {
    const { authorization } = req.headers

    const token = authorization.replace('Bearer ', '')

    const secretKey = process.env.JWT_SECRET

    const data = jwt.verify(token, secretKey)

    const { rows: customerSession } = await sessionsRepositories.getByToken(
      token
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
