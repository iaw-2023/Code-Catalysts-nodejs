const { Pool } = require('pg');
const {USER, PASSWORD, HOST, PORT, DATABASE} = require('../constantes');

const supabase = new Pool({
  user: USER,
  password: PASSWORD,
  host: HOST,
  port: PORT,
  database: DATABASE,
});

module.exports = {
    supabase
}