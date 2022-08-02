import pg from 'pg'

const { Pool } = pg

const connection = new Pool({
  user: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'shortly',
  password: '97547576'
})

export default connection
