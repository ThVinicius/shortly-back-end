import joi from 'joi'

const shortUrlParamsSchema = joi.object({
  shortUrl: joi.string().uri()
})

export default shortUrlParamsSchema
