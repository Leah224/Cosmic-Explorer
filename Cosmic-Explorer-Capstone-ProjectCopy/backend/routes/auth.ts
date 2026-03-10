import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../db"; // your existing db connection

const router = express.Router();

/* -------------------- TYPES -------------------- */
interface RegisterBody {
  username: string;
  email: string;
  password: string;
}

interface LoginBody {
  email: string;
  password: string;
}

/* -------------------- REGISTER -------------------- */
router.post(
  "/register",
  async (req: Request<{}, {}, RegisterBody>, res: Response) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields required" });
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const result = await pool.query(
        "INSERT INTO auth.users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, email",
        [username, email, hashedPassword]
      );

      res.status(201).json({
        message: "User created",
        user: result.rows[0],
      });
    } catch (err: any) {
      console.error("Register error:", err); // logs in Render
      res.status(500).json({
        error: "Server error",
        message: err.message,   // full error message
        stack: err.stack       // stack trace
      });
    }
  }
);

/* -------------------- LOGIN -------------------- */
router.post(
  "/login",
  async (req: Request<{}, {}, LoginBody>, res: Response) => {
    const { email, password } = req.body;

    try {
      const result = await pool.query(
        "SELECT * FROM auth.users WHERE email = $1",
        [email]
      );

      if (result.rows.length === 0) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const user = result.rows[0];

      const validPassword = await bcrypt.compare(
        password,
        user.password_hash
      );

      if (!validPassword) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET as string,
        { expiresIn: "1h" }
      );

      res.json({ token, user: { id: user.id, email: user.email, username: user.username } });
    } catch (err: any) {
      console.error("Login error:", err);
      res.status(500).json({
        error: "Server error",
        message: err.message,
        stack: err.stack
      });
    }
  }
);

export default router;