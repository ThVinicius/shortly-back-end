import joi from 'joi'

const regex = /^Bearer\s{1}/

const tokenSchema = joi.string().pattern(regex).required()

export default tokenSchema
