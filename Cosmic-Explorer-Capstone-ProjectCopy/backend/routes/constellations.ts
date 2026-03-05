import express, { Request, Response } from "express";
import fs from "fs";
import path from "path";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  try {
    const dataPath = path.join(__dirname, "../data/constellations.json");
    const constellationsData = fs.readFileSync(dataPath, "utf8");
    const constellations = JSON.parse(constellationsData);
    res.json(constellations);
  } catch (err: any) {
    console.error("Error reading constellations:", err.message);
    res.status(500).json({ error: "Failed to fetch constellations" });
  }
});

export default router;
