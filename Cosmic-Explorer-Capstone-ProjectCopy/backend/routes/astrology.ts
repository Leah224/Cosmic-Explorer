import express, { Request, Response } from "express";
import axios from "axios";

const router = express.Router();

/* -------------------- ZODIAC TRAITS -------------------- */
const zodiacTraits: Record<string, { element: string; traits: string; description: string }> = {
  Aries: { element: "Fire", traits: "Bold, ambitious, energetic", description: "Aries are natural leaders." },
  Taurus: { element: "Earth", traits: "Reliable, patient, practical", description: "Taurus values stability." },
  Gemini: { element: "Air", traits: "Curious, adaptable, expressive", description: "Geminis thrive on communication." },
  Cancer: { element: "Water", traits: "Intuitive, emotional, protective", description: "Cancer is deeply connected to home." },
  Leo: { element: "Fire", traits: "Confident, creative, charismatic", description: "Leos shine brightly." },
  Virgo: { element: "Earth", traits: "Analytical, kind, detail-oriented", description: "Virgos seek improvement." },
  Libra: { element: "Air", traits: "Balanced, social, fair-minded", description: "Libra strives for harmony." },
  Scorpio: { element: "Water", traits: "Passionate, resourceful, intense", description: "Scorpios value truth." },
  Sagittarius: { element: "Fire", traits: "Adventurous, optimistic, honest", description: "Sagittarius seeks freedom." },
  Capricorn: { element: "Earth", traits: "Disciplined, responsible, ambitious", description: "Capricorns focus on goals." },
  Aquarius: { element: "Air", traits: "Innovative, independent, humanitarian", description: "Aquarius values individuality." },
  Pisces: { element: "Water", traits: "Compassionate, artistic, intuitive", description: "Pisces are deeply empathetic." }
};

/* -------------------- GET SUN SIGN -------------------- */
function getSunSign(month: number, day: number): string {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini";
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius";
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn";
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius";
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "Pisces";
  return "Unknown";
}

/* -------------------- ROUTE -------------------- */

interface AstrologyRequestBody {
  year: number;
  month: number;
  date: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  latitude?: number;
  longitude?: number;
  timezone?: string;
  config?: object;
  language?: string;
}

router.post("/", async (req: Request<{}, {}, AstrologyRequestBody>, res: Response) => {
  const { year, month, date, hours, minutes, seconds, latitude, longitude, timezone, config, language } = req.body;

  if (!year || !month || !date) {
    return res.status(400).json({ error: "Year, month, and date are required" });
  }

  try {
    const response = await axios.post(
      "https://json.freeastrologyapi.com/horoscope-chart-svg-code",
      { year, month, date, hours, minutes, seconds, latitude, longitude, timezone, config, language },
      { headers: { "Content-Type": "application/json", "x-api-key": process.env.ASTRO_API_KEY } }
    );

    const chartSVG = response.data.svg;

    const sunSignName = getSunSign(month, date);
    const sunSign = zodiacTraits[sunSignName];

    res.json({
      sunSign: { sign: sunSignName, ...sunSign },
      chart: chartSVG
    });

  } catch (err: any) {
    console.error("Error calling astrology API:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch astrology data" });
  }
});

export default router;
