import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../db";

const router = express.Router();

/* -------------------- REGISTER -------------------- */
router.post("/register", async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "All fields required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO auth.users (username, email, password_hash)
       VALUES ($1, $2, $3) RETURNING id, username, email`,
      [username, email, hashedPassword]
    );

    res.status(201).json({ user: result.rows[0] });
  } catch (err: any) {
    console.error("Register error:", err);
    if (err.code === "23505") return res.status(400).json({ error: "Email already exists" });
    res.status(500).json({ error: "Server error" });
  }
});

/* -------------------- LOGIN -------------------- */
router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) return res.status(400).json({ error: "Email and password required" });

  try {
    const result = await pool.query(`SELECT * FROM auth.users WHERE email = $1`, [email]);

    if (result.rows.length === 0) return res.status(401).json({ error: "Invalid credentials" });

    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password_hash);

    if (!validPassword) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );

    res.json({ token, user: { id: user.id, username: user.username, email: user.email } });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;