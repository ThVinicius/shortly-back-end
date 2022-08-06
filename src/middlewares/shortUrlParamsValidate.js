import shortUrlParamsSchema from '../schemas/shortUrlParamsSchema.js'
import urlsRepositories from '../repositories/urlsRepositories.js'

export default async function shortUrlParamsValidate(req, res, next) {
  const { error } = shortUrlParamsSchema.validate(req.params)

  if (error) return res.sendStatus(400)

  const { rows: url } = await urlsRepositories.incVisitCount(
    req.params.shortUrl
  )

  if (url.length === 0) return res.sendStatus(404)

  res.locals.url = url[0].url

  next()
}
