import loginSchema from '../schemas/loginSchema.js'
import bcrypt from 'bcrypt'
import customerRepositories from '../repositories/customerRepositories.js'

export default async function loginValidate(req, res, next) {
  const { error } = loginSchema.validate(req.body, { abortEarly: false })

  if (error) {
    const message = []

    for (const err of error.details) {
      message.push(err.message)
    }

    return res.status(422).send(message)
  }

  try {
    const { email, password } = req.body

    const { rows: customer } = await customerRepositories.getByEmail(email)

    if (customer.length === 0) return res.sendStatus(401)

    const compare = bcrypt.compareSync(password, customer[0].password)

    if (!compare) return res.sendStatus(401)

    delete customer[0].password

    res.locals.customer = customer[0]

    next()
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}
