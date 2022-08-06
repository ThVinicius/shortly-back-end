import createUrlSchema from '../schemas/createUrlSchema.js'

export default function createUrlValidate(req, res, next) {
  const { error } = createUrlSchema.validate(req.body, { abortEarly: false })

  if (error) {
    const message = []

    for (const err of error.details) {
      message.push(err.message)
    }

    return res.status(422).send(message)
  }

  next()
}
