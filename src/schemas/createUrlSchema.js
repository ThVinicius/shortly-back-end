import joi from 'joi'

const AddUrlSchema = joi.object({
  url: joi.string().uri().required()
})

export default AddUrlSchema
