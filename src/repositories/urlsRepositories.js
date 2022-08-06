import connection from '../database/postgreSQL.js'

function insert(url, shortUrl, customerId) {
  return connection.query(
    'INSERT INTO urls (url, "shortUrl", "customerId") VALUES ($1, $2, $3)',
    [url, shortUrl, customerId]
  )
}

function getById(id) {
  return connection.query('SELECT * FROM urls WHERE id = $1 LIMIT 1', [id])
}

function deleteOne(customerId, id) {
  return connection.query(
    'DELETE FROM urls WHERE "customerId" = $1 AND id = $2',
    [customerId, id]
  )
}

function incVisitCount(shortUrl) {
  return connection.query(
    'UPDATE urls SET "visitCount" = "visitCount" + 1 WHERE "shortUrl" = $1 RETURNING url',
    [shortUrl]
  )
}

export default { insert, getById, deleteOne, incVisitCount }
