import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import cors from "cors";
import { Pool } from "pg"; // <-- Added PostgreSQL import

import authRoutes from "./routes/auth";
import starmapRoutes from "./routes/starmap";
import constellationsRoutes from "./routes/constellations";
import apodRoutes from "./routes/apod";
import astrologyRoutes from "./routes/astrology";

const app = express();

app.use(cors({
  origin: "https://cosmic-explorer-frontend1-0.onrender.com", 
  credentials: true,
}));
app.use(express.json());

// ---------------- PostgreSQL Setup ----------------
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // required for Supabase
});

// Optional: test connection when server starts
pool.connect()
  .then(() => console.log("Connected to PostgreSQL successfully ✅"))
  .catch((err) => console.error("PostgreSQL connection error:", err));

// Export pool so your routes can use it
export { pool };

// ---------------------------------------------------

app.use("/api/starmap", starmapRoutes);
app.use("/api/constellations", constellationsRoutes);
app.use("/api/apod", apodRoutes);
app.use("/api/astrology", astrologyRoutes);
app.use("/api/auth", authRoutes);

// Root test route
app.get("/", (req: Request, res: Response) => {
  res.send("Cosmic Explorer Backend Running 🚀");
});

app.get("/test", (req, res) => {
  res.json({ message: "Backend is working!" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});