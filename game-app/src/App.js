// ================= App.jsx =================
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GameMenu from "./GameMenu";
import Question1 from "./Question1";
import Question2 from "./Question2";
import RoundIntro from "./RoundIntro";
import RoundIntro2 from "./RoundIntro2";
import RoundEnd from "./RoundEnd";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GameMenu />} />
        <Route path="/round1" element={<RoundIntro />} />
        <Route path="/game/question1" element={<Question1 />} />
        <Route path="/round2" element={<RoundIntro2 />} />
        <Route path="/game/question2" element={<Question2 />} />
        <Route path="/roundend" element={<RoundEnd />} />
      </Routes>
    </Router>
  );
}
