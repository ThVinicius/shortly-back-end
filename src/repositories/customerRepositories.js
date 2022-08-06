import connection from '../database/postgreSQL.js'

function insert(name, email, cryptPassword) {
  return connection.query(
    'INSERT INTO customers (name, email, password) VALUES ($1, $2, $3)',
    [name, email, cryptPassword]
  )
}

function getLinksById(customerId) {
  return connection.query(
    `
  SELECT 
  c.id, c.name, COALESCE(SUM("visitCount"), 0)::INTEGER AS "visitCount", 
  COALESCE(JSON_AGG(
    JSON_BUILD_OBJECT(
      'id', u.id, 'shortUrl', "shortUrl", 'url', url, 'visitCount', "visitCount"
    )
  ) FILTER (WHERE u.id IS NOT NULL),'[]') AS "shortenedUrls"
  FROM customers c 
  LEFT JOIN urls u ON c.id = u."customerId"
  WHERE c.id = $1
  GROUP BY c.id
  `,
    [customerId]
  )
}

function getRanking() {
  return connection.query(`
  SELECT 
    c.id, c.name, 
    COUNT("customerId")::INTEGER AS "linksCount", 
    COALESCE(SUM("visitCount"), 0)::INTEGER AS "visitCount" 
  FROM customers c
  LEFT JOIN urls u ON c.id = u."customerId"
  GROUP BY c.id
  ORDER BY "visitCount" DESC, "linksCount" DESC
  LIMIT 10
`)
}

function getByEmail(email) {
  return connection.query('SELECT * FROM customers WHERE email = $1 LIMIT 1', [
    email
  ])
}

export default { insert, getLinksById, getRanking, getByEmail }
