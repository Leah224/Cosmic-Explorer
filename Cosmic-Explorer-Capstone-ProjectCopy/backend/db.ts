import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

/* -------------------- DATABASE POOL -------------------- */

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // use the full DATABASE_URL from Render
  ssl: { rejectUnauthorized: false }          // required for Supabase
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
