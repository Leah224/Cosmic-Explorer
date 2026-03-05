//"node i want to use postgres"
//pool = resuable set of database connections so we dont reconnect everytime
const { Pool } = require("pg");

//Read the .env file and load its values into node
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

