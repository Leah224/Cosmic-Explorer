import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ApodData {
  title: string;
  explanation: string;
  url: string;
  media_type: string;
  date: string;
}

export default function APOD() {
  const [apod, setApod] = useState<ApodData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApod = async () => {
      try {
        const response = await fetch("https://cosmic-explorer-jegj.onrender.com/api/apod");
        if (!response.ok) throw new Error("Failed to fetch APOD");
        const data = await response.json();

        // ✅ Fix: Ensure explanation starts with a capital letter
        if (data.explanation && data.explanation.length > 0) {
          const firstChar = data.explanation[0];
          if (firstChar.match(/[a-zA-Z]/) && firstChar === firstChar.toLowerCase()) {
            data.explanation = firstChar.toUpperCase() + data.explanation.slice(1);
          }
        }

        setApod(data);
      } catch (err: any) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchApod();
  }, []);

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (error) return <p style={{ textAlign: "center", color: "red" }}>Error: {error}</p>;
  if (!apod) return null;

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0a0614] text-slate-100 px-6 py-16">

      {/* 🌌 Background aura layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#120a2a] via-[#090414] to-black" />
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[160px]" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-fuchsia-600/20 rounded-full blur-[160px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.7))]" />

      <div className="relative max-w-4xl mx-auto">

        {/* ← Back Button */}
        <button
          onClick={() => navigate("/home")}
          className="mb-6 px-5 py-2 rounded-full bg-white/5 backdrop-blur-md border border-white/10 hover:border-fuchsia-400/40 hover:bg-fuchsia-500/10 transition-all duration-500 text-slate-200 hover:text-white shadow-lg hover:shadow-fuchsia-500/20"
        >
          ← Back
        </button>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-extralight tracking-wide text-center mb-10 bg-gradient-to-r from-violet-200 via-fuchsia-200 to-indigo-200 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(192,132,252,0.6)]">
          {apod.title}
        </h1>

        {/* Media Container */}
        <div className="rounded-3xl overflow-hidden backdrop-blur-2xl bg-white/5 border border-white/10 shadow-[0_0_60px_rgba(139,92,246,0.25)] mb-10">
          {apod.media_type === "image" ? (
            <img src={apod.url} alt={apod.title} className="w-full object-cover" />
          ) : (
            <iframe title={apod.title} src={apod.url} className="w-full h-[500px]" />
          )}
        </div>

        {/* Explanation Card */}
        <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-violet-400/10 shadow-[0_0_40px_rgba(192,132,252,0.15)]">
          <p className="text-slate-300 leading-relaxed tracking-wide text-lg">{apod.explanation}</p>
          <div className="mt-8 h-[1px] w-32 bg-gradient-to-r from-transparent via-violet-400/60 to-transparent mx-auto" />
          <p className="text-center text-violet-300/80 mt-6 tracking-widest text-sm uppercase">{apod.date}</p>
        </div>

      </div>
    </div>
  );
}