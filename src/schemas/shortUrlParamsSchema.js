import joi from 'joi'

const shortUrlParamsSchema = joi.object({
  shortUrl: joi.string().length(9).required()
})

export default shortUrlParamsSchema
