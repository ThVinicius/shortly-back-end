import registerSchema from '../schemas/registerSchema.js'

export default function registerValidate(req, res, next) {
  const { error } = registerSchema.validate(req.body, { abortEarly: false })

  if (error) {
    const message = []

    for (const err of error.details) {
      message.push(err.message)
    }

    return res.status(422).send(message)
  }

  next()
}
