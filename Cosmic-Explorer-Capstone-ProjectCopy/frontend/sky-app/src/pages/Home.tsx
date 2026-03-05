import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Home() {
  const navigate = useNavigate();

  // 🔒 Protect route (no token = no access)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth");
    }
  }, [navigate]);

  // 🚪 Logout handler
  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/auth");
  }

return (
  <div className="relative min-h-screen overflow-hidden bg-[#0a0614] text-slate-100">

    {/* 🌌 Sacred Cosmic Background Layers */}
    <div className="absolute inset-0 bg-gradient-to-br from-[#120a2a] via-[#090414] to-black" />

    {/* Aura glows */}
    <div className="absolute top-[-250px] left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-violet-600/20 rounded-full blur-[180px]" />
    <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[160px]" />
    <div className="absolute bottom-[-200px] left-[-200px] w-[500px] h-[500px] bg-fuchsia-500/20 rounded-full blur-[160px]" />

    {/* Subtle vignette */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.6))]" />

    <div className="relative max-w-6xl mx-auto px-6 py-16">

      {/* Header */}
      <div className="flex justify-between items-center mb-16">
        <h1 className="text-5xl font-extralight tracking-[0.15em] text-center bg-gradient-to-r from-violet-200 via-fuchsia-200 to-indigo-200 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(192,132,252,0.6)]">
          Cosmic Explorer
        </h1>

        <button
          onClick={handleLogout}
          className="px-5 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:border-fuchsia-400/40 hover:bg-fuchsia-500/10 transition-all duration-500 text-slate-200 hover:text-white shadow-lg hover:shadow-fuchsia-500/20"
        >
          Logout
        </button>
      </div>

      {/* ✨ Sacred Tagline */}
      <div className="text-center mb-20">
        <p className="text-xl md:text-2xl font-light text-violet-200/90 tracking-wide leading-relaxed max-w-2xl mx-auto">
          The stars whisper ancient stories.  
          Step into the cosmos and uncover what awaits you tonight.
        </p>

        <div className="mt-8 h-[1px] w-40 mx-auto bg-gradient-to-r from-transparent via-violet-400/60 to-transparent" />
      </div>

      {/* Portal Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">

        <Link to="/favorites" className="group">
          <div className="relative p-10 rounded-3xl bg-white/5 backdrop-blur-2xl border border-violet-400/10 transition-all duration-700 hover:-translate-y-3 hover:shadow-[0_0_60px_rgba(192,132,252,0.35)]">

            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition duration-700" />

            <h2 className="text-2xl mb-4 font-light text-violet-200 tracking-wide">
              ⭐ Favorites
            </h2>
            <p className="text-slate-400 group-hover:text-slate-300 transition">
              Preserve the celestial discoveries that resonate with your spirit.
            </p>
          </div>
        </Link>

        <Link to="/starmap" className="group">
          <div className="relative p-10 rounded-3xl bg-white/5 backdrop-blur-2xl border border-indigo-400/10 transition-all duration-700 hover:-translate-y-3 hover:shadow-[0_0_60px_rgba(129,140,248,0.35)]">

            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition duration-700" />

            <h2 className="text-2xl mb-4 font-light text-indigo-200 tracking-wide">
            🪐Observatory
            </h2>
            <p className="text-slate-400 group-hover:text-slate-300 transition">
              Gaze upon whats in the sky based on your location.
            </p>
          </div>
        </Link>

        <Link to="/apod" className="group">
          <div className="relative p-10 rounded-3xl bg-white/5 backdrop-blur-2xl border border-fuchsia-400/10 transition-all duration-700 hover:-translate-y-3 hover:shadow-[0_0_60px_rgba(217,70,239,0.35)]">

            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-fuchsia-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition duration-700" />

            <h2 className="text-2xl mb-4 font-light text-fuchsia-200 tracking-wide">
              🌙 APOD
            </h2>
            <p className="text-slate-400 group-hover:text-slate-300 transition">
              Witness the universe’s daily revelation through NASA’s lens.
            </p>
          </div>
        </Link>

        <Link to="/astrology" className="group">
          <div className="relative p-10 rounded-3xl bg-white/5 backdrop-blur-2xl border border-cyan-400/10 transition-all duration-700 hover:-translate-y-3 hover:shadow-[0_0_60px_rgba(34,211,238,0.35)]">

            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-cyan-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition duration-700" />

            <h2 className="text-2xl mb-4 font-light text-cyan-200 tracking-wide">
              ♓ Astrology
            </h2>
            <p className="text-slate-400 group-hover:text-slate-300 transition">
              Learn all about your astrology sign.
            </p>
          </div>
        </Link>

      </div>

    </div>
  </div>
);
}