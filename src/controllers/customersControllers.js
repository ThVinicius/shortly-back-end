import connection from '../database/postgreSQL.js'
import { nanoid } from 'nanoid'

export async function createUrl(req, res) {
  try {
    const { url } = req.body

    const { customerId } = res.locals

    const shortUrl = nanoid(9)

    await connection.query(
      'INSERT INTO urls (url, "shortUrl", "customerId") VALUES ($1, $2, $3)',
      [url, shortUrl, customerId]
    )

    return res.status(201).send({ shortUrl })
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}

export async function getUrlById(req, res) {
  try {
    const { id } = req.params

    const { rows: url } = await connection.query(
      'SELECT * FROM urls WHERE id = $1',
      [id]
    )

    if (url.length === 0) return res.sendStatus(404)

    return res.status(200).send(url[0])
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}
