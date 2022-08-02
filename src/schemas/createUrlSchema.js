import joi from 'joi'

const createUrlSchema = joi.object({
  url: joi.string().uri().required()
})

export default createUrlSchema
