import joi from 'joi'

const loginSchema = joi.object({
  name: joi.string().trim().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
  confirmPassword: joi.ref('password')
})

export default loginSchema
