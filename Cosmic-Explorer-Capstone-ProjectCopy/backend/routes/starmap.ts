import express from "express";
import * as Astronomy from "astronomy-engine";

const router = express.Router();

const bodies = [
  "Sun", "Moon", "Mercury", "Venus", "Mars",
  "Jupiter", "Saturn", "Uranus", "Neptune", "Polaris",
];

router.post("/", async (req, res) => {
  const { latitude, longitude, datetime } = req.body;
  if (!latitude || !longitude || !datetime)
    return res.status(400).json({ error: "Missing parameters" });

  try {
    const observer = new Astronomy.Observer(latitude, longitude, 0);
    const obsTime = new Date(datetime); // Full date + time

    const visibleBodies: { name: string; altitude: number; azimuth: number }[] = [];

    for (const name of bodies) {
      if (name === "Polaris") {
        visibleBodies.push({ name, altitude: 45, azimuth: 0 });
        continue;
      }

      const body: Astronomy.Body = (Astronomy.Body as any)[name];
      if (!body) continue;

      // Get equatorial coordinates
      const equ = Astronomy.Equator(body, obsTime, observer, true, true);

      // Convert to horizontal coordinates (RA/DEC)
      const hor = Astronomy.Horizon(obsTime, observer, equ.ra, equ.dec, "normal");

      // Only show planets above horizon (>0° altitude)
      if (hor.altitude > 0) {
        visibleBodies.push({
          name,
          altitude: hor.altitude,
          azimuth: hor.azimuth,
        });
      }
    }

    res.json(visibleBodies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to calculate visible bodies" });
  }
});

export default router;