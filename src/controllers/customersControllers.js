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

export async function openUrl(_, res) {
  const { url } = res.locals

  return res.redirect(url)
}

export async function deleteUrl(req, res) {
  try {
    const { customerId } = res.locals

    const { id } = req.params

    await connection.query(
      'DELETE FROM urls WHERE "customerId" = $1 AND id = $2',
      [customerId, id]
    )

    return res.sendStatus(204)
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}

export async function getUrlsByCustomer(_, res) {
  try {
    const { customerId } = res.locals

    const { rows: urlsById } = await connection.query(
      `
    SELECT 
    c.id, c.name, SUM(views) AS "visitCount", 
    JSON_AGG(
      JSON_BUILD_OBJECT(
        'id', c.id, 'shortUrl', "shortUrl", 'url', url, 'visitCount', views
      )
    ) AS "shortenedUrls"
    FROM customers c 
    JOIN urls u ON c.id = u."customerId"
    WHERE c.id = $1
    GROUP BY c.id
    `,
      [customerId]
    )

    return res.status(200).send(urlsById)
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}

export async function getRanking(_, res) {
  try {
    const { rows: ranking } = await connection.query(`
      SELECT 
        c.id, c.name, 
        COUNT("customerId")::INTEGER AS "linksCount", 
        COALESCE(SUM(views), 0)::INTEGER AS "visitCount" 
      FROM customers c
      LEFT JOIN urls u ON c.id = u."customerId"
      GROUP BY c.id
      ORDER BY "visitCount" DESC, "linksCount" DESC
      LIMIT 10
    `)

    return res.status(200).send(ranking)
  } catch (error) {
    console.log(error)
    return res.status(500).send(error)
  }
}
