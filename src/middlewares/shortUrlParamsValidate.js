import shortUrlParamsSchema from '../schemas/shortUrlParamsSchema.js'
import connection from '../database/postgreSQL.js'

export default async function shortUrlParamsValidate(req, res, next) {
  const { error } = shortUrlParamsSchema.validate(req.params)

  if (error) return res.sendStatus(400)

  const { rows: url } = await connection.query(
    'UPDATE urls SET "visitCount" = "visitCount" + 1 WHERE "shortUrl" = $1 RETURNING url',
    [req.params.shortUrl]
  )

  if (url.length === 0) return res.sendStatus(404)

  res.locals.url = url[0].url

  next()
}
