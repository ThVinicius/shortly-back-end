import connection from '../database/postgreSQL.js'

function insert(customerId, token) {
  return connection.query(
    `INSERT INTO 
        sessions ("customerId", token) VALUES ($1, $2) 
        ON CONFLICT ("customerId") 
        DO UPDATE SET token = EXCLUDED.token`,
    [customerId, token]
  )
}

function getByToken(token) {
  return connection.query('SELECT * FROM sessions WHERE token = $1 LIMIT 1', [
    token
  ])
}

export default { insert, getByToken }
