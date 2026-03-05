import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import StarMap from "./pages/Sky";
import Astrology from "./pages/Astrology";
import APOD from "./pages/Apod";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/auth" />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/home" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/starmap" element={<StarMap />} />
        <Route path="/astrology" element={<Astrology />} />
        <Route path="/apod" element={<APOD />} />  {/* <-- Add this */}
        <Route path="*" element={<p className="text-white">Page not found</p>} />
      </Routes>
    </Router>
  );
}

export default App;
