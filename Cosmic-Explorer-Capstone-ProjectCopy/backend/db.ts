import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Force PostgreSQL to use the "auth" schema by default
pool.query('SET search_path TO auth;')
  .then(() => console.log('Search path set to auth ✅'))
  .catch(err => console.error('Error setting search path:', err));

export default pool;