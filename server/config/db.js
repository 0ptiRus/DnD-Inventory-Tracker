const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,         
  host: 'localhost',
  database: process.env.DB_NAME,     
  password: process.env.DB_PASSWORD, 
  port: 5432,                        
});

pool.on('connect', () => {
  console.log('Connected to PostgreSQL');
});

pool.on('error', (err) => {
  console.error('PostgreSQL connection error', err);
});

module.exports = pool;
