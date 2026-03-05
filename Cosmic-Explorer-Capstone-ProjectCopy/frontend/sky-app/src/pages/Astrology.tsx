import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { mockZodiacTraits, type SignInfo } from "./mockZodiacTraits";

// Zodiac symbols map
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

export default function Astrology() {
  const location = useLocation();
  const navigate = useNavigate();

  const clickedSign = location.state?.sign as string | undefined;

  const [birthDate, setBirthDate] = useState("");
  const [zodiac, setZodiac] = useState<SignInfo | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (clickedSign && mockZodiacTraits[clickedSign]) {
      const signData = mockZodiacTraits[clickedSign];
      setZodiac(signData);
    }
  }, [clickedSign]);

  useEffect(() => {
    if (!zodiac) return;
    const saved = localStorage.getItem("favorites");
    const favorites: string[] = saved ? JSON.parse(saved) : [];
    setIsFavorite(favorites.includes(zodiac.sign));
  }, [zodiac]);

  function toggleFavorite() {
    if (!zodiac) return;

    const saved = localStorage.getItem("favorites");
    let favorites: string[] = saved ? JSON.parse(saved) : [];

    if (favorites.includes(zodiac.sign)) {
      favorites = favorites.filter(s => s !== zodiac.sign);
      setIsFavorite(false);
    } else {
      favorites.push(zodiac.sign);
      setIsFavorite(true);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!birthDate) return;

    const date = new Date(birthDate);
    const month = date.getMonth() + 1;
    const day = date.getDate();

    let sign: SignInfo | null = null;

    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) sign = mockZodiacTraits.Aries;
    else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) sign = mockZodiacTraits.Taurus;
    else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) sign = mockZodiacTraits.Gemini;
    else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) sign = mockZodiacTraits.Cancer;
    else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) sign = mockZodiacTraits.Leo;
    else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) sign = mockZodiacTraits.Virgo;
    else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) sign = mockZodiacTraits.Libra;
    else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) sign = mockZodiacTraits.Scorpio;
    else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) sign = mockZodiacTraits.Sagittarius;
    else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) sign = mockZodiacTraits.Capricorn;
    else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) sign = mockZodiacTraits.Aquarius;
    else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) sign = mockZodiacTraits.Pisces;

    if (sign) {
      setZodiac(sign);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0614] text-slate-100">

      {/* Cosmic background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#120a2a] via-[#090414] to-black" />
      <div className="absolute top-[-250px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-violet-600/20 rounded-full blur-[180px]" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[160px]" />
      <div className="absolute bottom-[-200px] left-[-200px] w-[500px] h-[500px] bg-fuchsia-500/20 rounded-full blur-[160px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.6))]" />

      <div className="relative max-w-5xl mx-auto px-6 py-16">

        {/* Back button */}
        <button
          onClick={() => navigate("/home")}
          className="mb-8 px-5 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:border-fuchsia-400/40 hover:bg-fuchsia-500/10 transition-all duration-500 text-slate-200 hover:text-white shadow-lg hover:shadow-fuchsia-500/20"
        >
          ← Back
        </button>

        {/* Title */}
        <h1 className="text-5xl font-extralight tracking-[0.15em] text-center bg-gradient-to-r from-violet-200 via-fuchsia-200 to-indigo-200 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(192,132,252,0.6)] mb-12">
          Astrology
        </h1>

        {/* Input card */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-10 shadow-xl">

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              type="date"
              value={birthDate}
              max={new Date().toISOString().split("T")[0]}
              onChange={e => setBirthDate(e.target.value)}
              className="w-full p-3 rounded-full bg-black/40 border border-white/10 text-slate-200"
              required
            />

            <button
              type="submit"
              className="w-full py-3 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 hover:opacity-90 transition shadow-lg hover:shadow-violet-500/30"
            >
              Reveal My Sign ✨
            </button>

          </form>

        </div>

        {/* Zodiac Modal */}
        {zodiac && (
          <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 overflow-auto p-4">

            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 relative shadow-2xl w-full max-w-3xl flex flex-col items-center text-center">

              <button
                onClick={() => setZodiac(null)}
                className="absolute top-4 right-4 text-3xl text-red-400 hover:text-red-600"
              >
                ×
              </button>

              <button
                onClick={toggleFavorite}
                className="absolute top-4 left-4 text-3xl"
              >
                {isFavorite ? (
                  <span className="text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.9)]">★</span>
                ) : (
                  <span className="text-slate-400 hover:text-yellow-300">☆</span>
                )}
              </button>

              {/* Zodiac Symbol */}
              <div className="text-7xl mb-2 text-violet-300 drop-shadow-[0_0_25px_rgba(192,132,252,0.8)]">
                {zodiacSymbols[zodiac.sign]}
              </div>

              {/* Sign Name */}
              <h2 className="text-3xl text-indigo-300 mb-4">
                {zodiac.sign} (Sun Sign)
              </h2>

              <div className="text-left w-full space-y-2">

                <p className="text-slate-400"><span className="text-indigo-400 font-medium">Element:</span> {zodiac.element}</p>
                <p className="text-slate-400"><span className="text-indigo-400 font-medium">Traits:</span> {zodiac.traits}</p>
                <p className="text-slate-400"><span className="text-indigo-400 font-medium">Strengths:</span> {zodiac.strengths}</p>
                <p className="text-slate-400"><span className="text-indigo-400 font-medium">Weaknesses:</span> {zodiac.weaknesses}</p>
                <p className="text-slate-400"><span className="text-indigo-400 font-medium">Love:</span> {zodiac.love}</p>
                <p className="text-slate-400"><span className="text-indigo-400 font-medium">Career:</span> {zodiac.career}</p>
                <p className="text-slate-400"><span className="text-indigo-400 font-medium">Lucky Color:</span> {zodiac.luckyColor}</p>
                <p className="text-slate-400"><span className="text-indigo-400 font-medium">Lucky Number:</span> {zodiac.luckyNumber}</p>
                <p className="text-slate-400"><span className="text-indigo-400 font-medium">Lucky Day:</span> {zodiac.luckyDay}</p>

                <p className="text-slate-300 mt-3">
                  {zodiac.description}
                </p>

              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}