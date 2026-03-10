import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

pool.query("SELECT NOW()")
  .then(res => console.log("Database connected at:", res.rows[0]))
  .catch(err => console.error("Database connection error:", err));

export default pool;