import express, { Request, Response } from "express";
import axios from "axios";

const router = express.Router();

interface ApodQuery {
  date?: string;
}

// In-memory cache
interface CacheEntry {
  timestamp: number;
  data: any;
}
const cache: { [key: string]: CacheEntry } = {};

// Cache duration: 12 hours
const CACHE_TTL = 12 * 60 * 60 * 1000;

router.get("/", async (req: Request<{}, {}, {}, ApodQuery>, res: Response) => {
  const { date } = req.query;

  if (!process.env.NASA_API_KEY) {
    return res.status(500).json({ error: "NASA API key not set" });
  }

  const cacheKey = date || "today";

  // Return cached data if available
  const cached = cache[cacheKey];
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return res.json(cached.data);
  }

  try {
    const response = await axios.get("https://api.nasa.gov/planetary/apod", {
      params: {
        api_key: process.env.NASA_API_KEY,
        date: date || undefined,
      },
    });

    // Save in cache
    cache[cacheKey] = {
      timestamp: Date.now(),
      data: response.data,
    };

    res.json(response.data);
  } catch (err: any) {
    console.error("Error fetching APOD:", err.message);
    res.status(500).json({ error: "Failed to fetch APOD" });
  }
});

export default router;