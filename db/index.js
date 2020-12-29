const { Pool } = require('pg')

const config = {
  user: 'cata',
  password: '1234',
  host: 'localhost',
  database: 'gym',
  port: 5432
}

const pool = new Pool(config)

async function getDate() {
  const result = await pool.query("SELECT NOW()")
  return result
}
//dataArray example => ['lagartijas', 3, 15, 3]
async function createExercises(dataArray) {
  const qryObject = {
    text: 'INSERT INTO excercises (name, series, repititions, rest) VALUES ($1, $2, $3, $4)',
    values: dataArray
  }
  const result = await pool.query(qryObject)
  return result
}

module.exports = {
  getDate,
  createExercises
}