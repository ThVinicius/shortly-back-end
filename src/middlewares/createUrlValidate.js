import createUrlSchema from '../schemas/createUrlSchema.js'

export default function createUrlValidate(req, res, next) {
  const { error } = createUrlSchema.validate(req.body)

  if (error) return res.sendStatus(400)

  next()
}
