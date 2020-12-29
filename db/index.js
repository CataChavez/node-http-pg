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
//paramsArray example => ['lagartijas', 3, 15, 3]
async function createExercise(paramsArray) {
  const qryObject = {
    text: 'INSERT INTO exercises (name, series, repetitions, rest) VALUES ($1, $2, $3, $4)',
    values: paramsArray
  }
  const result = await pool.query(qryObject)
  return result
}

async function getExercise(){
  const result = await pool.query('SELECT * FROM exercises')
  return result
}

//paramsArray example => ['lagartijas', 3, 15, 3]
async function updateExercise(paramsArray){
  //TODO: flexible params
  const qryObject = {
    text:
      "UPDATE exercises SET name = $1, series = $2, repetitions = $3, rest = $4 WHERE name = $1 RETURNING *",
    values: paramsArray,
  };
  const result = await pool.query(qryObject);
  return result;
}

async function destroyExercise(name){
  const result = await pool.query(`DELETE FROM exercises WHERE name = '${name}'`)
  return result
}

module.exports = {
  getDate,
  createExercise,
  getExercise,
  updateExercise,
  destroyExercise
}