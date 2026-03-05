import { useState } from "react";
import { useNavigate } from "react-router-dom";

const starImages: Record<string, string> = {
  sun: "/images/sun.png",
  moon: "/images/moon.png",
  mercury: "/images/mercury.png",
  venus: "/images/venus.png",
  mars: "/images/mars.png",
  jupiter: "/images/jupiter.png",
  saturn: "/images/saturn.png",
  uranus: "/images/uranus.png",
  neptune: "/images/neptune.png",
  polaris: "/images/polaris.png",
};

interface Star {
  name: string;
  altitude: number;
  azimuth: number;
}

export default function StarMap() {
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [datetime, setDatetime] = useState("");
  const [stars, setStars] = useState<Star[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(
    JSON.parse(localStorage.getItem("favorites") || "[]")
  );

  const navigate = useNavigate();

  async function fetchStars() {
    if (!lat || !lon || !datetime) return;
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/starmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          latitude: Number(lat),
          longitude: Number(lon),
          datetime,
        }),
      });
      const data = await res.json();
      setStars(data);
      setIndex(0);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch star data.");
    } finally {
      setLoading(false);
    }
  }

  function nextStar() {
    setIndex((prev) => (prev + 1) % stars.length);
  }

  function prevStar() {
    setIndex((prev) => (prev - 1 + stars.length) % stars.length);
  }

  function toggleFavorite(name: string) {
    let updated;
    if (favorites.includes(name)) {
      updated = favorites.filter((f) => f !== name);
    } else {
      updated = [...favorites, name];
    }
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  }

  const current = stars[index];

  // Visibility logic
  const sun = stars.find((s) => s.name.toLowerCase() === "sun");
  const isDaylight = sun && sun.altitude > 0;
  const lowAltitude = current && current.altitude < 5;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0614] text-slate-100 px-6 py-16 flex flex-col items-center">
      <div className="absolute inset-0 bg-gradient-to-br from-[#120a2a] via-[#090414] to-black" />
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[160px]" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[160px]" />

      <div className="relative w-full max-w-4xl">
        <button
          onClick={() => navigate("/home")}
          className="mb-6 px-5 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:border-fuchsia-400/40 hover:bg-fuchsia-500/10 transition-all duration-500 text-slate-200 hover:text-white shadow-lg hover:shadow-fuchsia-500/20"
        >
          ← Back
        </button>

        <h1 className="text-4xl font-extralight text-center mb-12 bg-gradient-to-r from-indigo-200 via-violet-200 to-fuchsia-200 bg-clip-text text-transparent">
          Celestial Observatory
        </h1>

        <div className="p-6 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 mb-12">
          <div className="flex flex-wrap gap-4 justify-center">
            <input
              type="number"
              placeholder="Latitude"
              value={lat}
              onChange={(e) => setLat(e.target.value)}
              className="px-4 py-2 rounded-full bg-black/40 border border-white/10"
            />
            <input
              type="number"
              placeholder="Longitude"
              value={lon}
              onChange={(e) => setLon(e.target.value)}
              className="px-4 py-2 rounded-full bg-black/40 border border-white/10"
            />
            <input
              type="datetime-local"
              value={datetime}
              onChange={(e) => setDatetime(e.target.value)}
              className="px-4 py-2 rounded-full bg-black/40 border border-white/10"
            />
            <button
              onClick={fetchStars}
              className="px-6 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600"
            >
              {loading ? "Consulting the Stars..." : "Reveal the Sky"}
            </button>
          </div>
        </div>

        {stars.length > 0 && current && (
          <>
            <div className="flex flex-col items-center text-center p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10">
              <h2 className="text-3xl font-light mb-6">{current.name.toUpperCase()}</h2>

              <div
                onClick={() => setShowInfo(true)}
                className="w-64 h-64 flex flex-col items-center justify-center cursor-pointer"
              >
                <img
                  src={starImages[current.name.toLowerCase()]}
                  alt={current.name}
                  className="w-48 h-48 object-contain"
                />
                <span className="text-sm text-violet-300/80 mt-2">
                  Click for visibility info & favorites
                </span>
              </div>

              <p className="mt-4">Altitude: {current.altitude.toFixed(1)}°</p>
              <p>Azimuth: {current.azimuth.toFixed(1)}°</p>

              <div className="flex gap-6 mt-6">
                <button
                  onClick={prevStar}
                  className="px-5 py-2 rounded-full bg-black/40 border border-white/10"
                >
                  ◀ Previous
                </button>
                <button
                  onClick={nextStar}
                  className="px-5 py-2 rounded-full bg-black/40 border border-white/10"
                >
                  Next ▶
                </button>
              </div>
            </div>

            {showInfo && (
              <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
                <div className="bg-[#140b2e] p-8 rounded-3xl max-w-md w-full text-center relative">
                  <button
                    onClick={() => setShowInfo(false)}
                    className="absolute top-4 right-4"
                  >
                    ✕
                  </button>

                  <h3 className="text-2xl mb-4">{current.name}</h3>
                  <img
                    src={starImages[current.name.toLowerCase()]}
                    alt={current.name}
                    className="w-48 h-48 object-contain mx-auto mb-4"
                  />

                  <p className="mb-6">
                    {current.name} is currently at altitude {current.altitude.toFixed(1)}° and azimuth {current.azimuth.toFixed(1)}° in your sky.
                  </p>

                  {/* Visibility info in popup */}
                  {isDaylight && current.name.toLowerCase() !== "sun" && (
                    <p className="mb-2 text-yellow-300">
                      Might not be visible due to daylight.
                    </p>
                  )}
                  {lowAltitude && (
                    <p className="mb-2 text-yellow-300">
                      Might not be easily visible (very low above horizon).
                    </p>
                  )}

                  <button
                    onClick={() => toggleFavorite(current.name)}
                    className="px-6 py-2 rounded-full bg-indigo-600"
                  >
                    {favorites.includes(current.name) ? "★ Favorited" : "☆ Add to Favorites"}
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}