import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Hardcoded deployed backend URL
  const BASE_URL = "https://cosmic-explorer-jegj.onrender.com/api";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const url = isSignup
      ? `${BASE_URL}/auth/register`
      : `${BASE_URL}/auth/login`;

    const body: any = isSignup
      ? { username, email, password }
      : { email, password };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Something went wrong");
        return;
      }

      if (!isSignup) {
        // Store token for API requests
        localStorage.setItem("token", data.token);
        // Optional: store user info if backend sends it
        if (data.user) localStorage.setItem("user", JSON.stringify(data.user));

        alert("Login successful!");
      } else {
        alert("Signup successful! You can now log in.");
        setIsSignup(false);
      }

      // Redirect after success
      navigate("/home");
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0614] text-slate-100 relative flex items-center justify-center">

      {/* Cosmic background glows */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#120a2a] via-[#090414] to-black" />
      <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[180px]" />
      <div className="absolute bottom-[-200px] right-[-200px] w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-[160px]" />
      <div className="absolute bottom-[-200px] left-[-200px] w-[500px] h-[500px] bg-fuchsia-500/20 rounded-full blur-[160px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.6))]" />

      <div className="relative z-10 w-full max-w-md p-8 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 shadow-2xl">
        <h1 className="text-3xl font-extralight text-center mb-8 -mt-1 leading-normal bg-gradient-to-r from-violet-200 via-fuchsia-200 to-indigo-200 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(192,132,252,0.6)]">
          {isSignup ? "Create Account" : "Login"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <input
              className="w-full p-3 rounded-full bg-black/40 border border-white/10 text-slate-200 placeholder:text-slate-400"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          )}

          <input
            className="w-full p-3 rounded-full bg-black/40 border border-white/10 text-slate-200 placeholder:text-slate-400"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="w-full p-3 rounded-full bg-black/40 border border-white/10 text-slate-200 placeholder:text-slate-400"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 hover:opacity-90 transition shadow-lg hover:shadow-violet-500/30"
          >
            {isSignup ? "Sign Up" : "Log In"}
          </button>
        </form>

        <p className="text-slate-400 text-center mt-4">
          {isSignup ? "Already have an account?" : "No account?"}
          <button
            type="button"
            onClick={() => setIsSignup(!isSignup)}
            className="text-indigo-400 ml-2 hover:underline"
          >
            {isSignup ? "Login" : "Sign up"}
          </button>
        </p>
      </div>
    </div>
  );
}