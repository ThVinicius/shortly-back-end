import registerSchema from '../schemas/registerSchema.js'

export default function registerValidate(req, res, next) {
  const { error } = registerSchema.validate(req.body)

  if (error) return res.sendStatus(400)

  next()
}
