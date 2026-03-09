import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockZodiacTraits } from "./mockZodiacTraits";

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

export default function Favorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [starData, setStarData] = useState<{ altitude: number; azimuth: number } | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("favorites");
    const favs: string[] = saved ? JSON.parse(saved) : [];
    setFavorites(favs);

    if (selected) {
      setIsFavorite(favs.includes(selected));
    }
  }, [selected]);

  // Mock: If you have star data saved in localStorage or fetched, replace this
  function fetchStarInfo(name: string) {
    // Example: static mock data; replace with your real star positions
    const data: Record<string, { altitude: number; azimuth: number }> = {
      sun: { altitude: 45, azimuth: 120 },
      moon: { altitude: 30, azimuth: 200 },
      polaris: { altitude: 60, azimuth: 0 },
      mercury: { altitude: 25, azimuth: 80 },
      venus: { altitude: 20, azimuth: 100 },
      mars: { altitude: 35, azimuth: 150 },
      jupiter: { altitude: 40, azimuth: 170 },
      saturn: { altitude: 22, azimuth: 250 },
      uranus: { altitude: 18, azimuth: 300 },
      neptune: { altitude: 15, azimuth: 330 },
    };
    return data[name.toLowerCase()] || { altitude: 0, azimuth: 0 };
  }

  function handleClick(name: string) {
    setSelected(name);
    setIsFavorite(favorites.includes(name));

    if (starImages[name.toLowerCase()]) {
      // Star/planet
      setStarData(fetchStarInfo(name));
    } else {
      // Zodiac
      setStarData(null);
    }
  }

  function toggleFavorite() {
    if (!selected) return;

    let favs = [...favorites];
    if (favs.includes(selected)) {
      favs = favs.filter(s => s !== selected);
      setIsFavorite(false);
      setSelected(null); // close modal if removed
    } else {
      favs.push(selected);
      setIsFavorite(true);
    }

    setFavorites(favs);
    localStorage.setItem("favorites", JSON.stringify(favs));
  }

  // Zodiac symbols
  const zodiacSymbols: Record<string, string> = {
    Aries: "♈︎",
    Taurus: "♉︎",
    Gemini: "♊︎",
    Cancer: "♋︎",
    Leo: "♌︎",
    Virgo: "♍︎",
    Libra: "♎︎",
    Scorpio: "♏︎",
    Sagittarius: "♐︎",
    Capricorn: "♑︎",
    Aquarius: "♒︎",
    Pisces: "♓︎",
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0614] text-slate-100">
      <div className="absolute inset-0 bg-gradient-to-br from-[#120a2a] via-[#090414] to-black" />
      <div className="absolute top-[-250px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-violet-600/20 rounded-full blur-[180px]" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[160px]" />
      <div className="absolute bottom-[-200px] left-[-200px] w-[500px] h-[500px] bg-fuchsia-500/20 rounded-full blur-[160px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.6))]" />

      <div className="relative max-w-6xl mx-auto px-6 py-16">
        <button
          onClick={() => navigate("/home")}
          className="mb-8 px-5 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:border-fuchsia-400/40 hover:bg-fuchsia-500/10 transition-all duration-500 text-slate-200 hover:text-white shadow-lg hover:shadow-fuchsia-500/20"
        >
          ← Back
        </button>

        <h1 className="text-5xl font-extralight tracking-[0.15em] text-center bg-gradient-to-r from-violet-200 via-fuchsia-200 to-indigo-200 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(192,132,252,0.6)] mb-12">
          Your Favorites
        </h1>

        {/* Favorites Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {favorites.length === 0 && (
            <p className="col-span-full text-center text-slate-400">
              No favorites yet. Add some from any page! ✨
            </p>
          )}
          {favorites.map(fav => (
            <button
              key={fav}
              onClick={() => handleClick(fav)}
              className="p-10 rounded-3xl bg-white/5 backdrop-blur-2xl border border-violet-400/10 transition-all duration-700 hover:-translate-y-3 hover:shadow-[0_0_60px_rgba(192,132,252,0.35)] flex justify-center items-center text-lg font-medium text-slate-100"
            >
              {fav}
            </button>
          ))}
        </div>

        {/* Modal */}
        {selected && (
          <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 overflow-auto p-4">
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 relative shadow-2xl w-full max-w-3xl flex flex-col items-center text-center">

              <button onClick={() => setSelected(null)} className="absolute top-4 right-4 text-3xl text-red-400 hover:text-red-600">×</button>
              <button onClick={toggleFavorite} className="absolute top-4 left-4 text-3xl">
                {isFavorite ? (
                  <span className="text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.9)]">★</span>
                ) : (
                  <span className="text-slate-400 hover:text-yellow-300">☆</span>
                )}
              </button>

              {/* If star, show image */}
              {starImages[selected.toLowerCase()] ? (
                <>
                  <img
                    src={starImages[selected.toLowerCase()]}
                    alt={selected}
                    className="w-48 h-48 object-contain mx-auto mb-4"
                  />
                  <p className="text-slate-400 mb-1">
                    Altitude: {starData?.altitude.toFixed(1)}°, Azimuth: {starData?.azimuth.toFixed(1)}°
                  </p>
                  {selected.toLowerCase() === "polaris" && (
                    <p className="text-slate-400">North Star — used for navigation.</p>
                  )}
                </>
              ) : (
                <>
                  {/* Zodiac */}
                  <div className="text-7xl mb-4">{zodiacSymbols[selected]}</div>
                  <h2 className="text-3xl text-indigo-300 mb-4">{selected}</h2>
                  <div className="text-left w-full space-y-2">
                    <p className="text-slate-400"><span className="text-indigo-400 font-medium">Element:</span> {mockZodiacTraits[selected].element}</p>
                    <p className="text-slate-400"><span className="text-indigo-400 font-medium">Traits:</span> {mockZodiacTraits[selected].traits}</p>
                    <p className="text-slate-400"><span className="text-indigo-400 font-medium">Strengths:</span> {mockZodiacTraits[selected].strengths}</p>
                    <p className="text-slate-400"><span className="text-indigo-400 font-medium">Weaknesses:</span> {mockZodiacTraits[selected].weaknesses}</p>
                    <p className="text-slate-400"><span className="text-indigo-400 font-medium">Love:</span> {mockZodiacTraits[selected].love}</p>
                    <p className="text-slate-400"><span className="text-indigo-400 font-medium">Career:</span> {mockZodiacTraits[selected].career}</p>
                    <p className="text-slate-400"><span className="text-indigo-400 font-medium">Lucky Color:</span> {mockZodiacTraits[selected].luckyColor}</p>
                    <p className="text-slate-400"><span className="text-indigo-400 font-medium">Lucky Number:</span> {mockZodiacTraits[selected].luckyNumber}</p>
                    <p className="text-slate-400"><span className="text-indigo-400 font-medium">Lucky Day:</span> {mockZodiacTraits[selected].luckyDay}</p>
                    <p className="text-slate-300 mt-3">{mockZodiacTraits[selected].description}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}