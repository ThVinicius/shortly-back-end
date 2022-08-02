import connection from '../database/postgreSQL.js'
import { nanoid } from 'nanoid'

export async function createUrl(req, res) {
  try {
    const { url } = req.body

    const { customer_id } = res.locals

    const shortUrl = nanoid(9)

    await connection.query(
      'INSERT INTO urls (original_url, short_url, customer_id) VALUES ($1, $2, $3)',
      [url, shortUrl, customer_id]
    )

    return res.status(201).send({ shortUrl })
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}
