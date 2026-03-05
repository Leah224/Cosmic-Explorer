import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

/* -------------------- DATABASE POOL -------------------- */

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT), // convert string to number
  database: process.env.DB_NAME,
});

/* -------------------- TEST CONNECTION -------------------- */

pool.query("SELECT NOW()")
  .then((res) => {
    console.log("Database connected at:", res.rows[0]);
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });

export default pool;
