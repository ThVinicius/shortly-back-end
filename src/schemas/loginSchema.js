import joi from 'joi'

const registerSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required()
})

export default registerSchema
