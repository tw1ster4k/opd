import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function GameMenu() {
  const [redTeam, setRedTeam] = useState([]);
  const [blueTeam, setBlueTeam] = useState([]);
  const [redInput, setRedInput] = useState("");
  const [blueInput, setBlueInput] = useState("");
  const navigate = useNavigate();

  const addPlayer = (team, setTeam, input, setInput) => {
    if (!input.trim()) return;
    setTeam([...team, input]);
    setInput("");
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #141e30, #243b55)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 30
    }}>
      <h1 style={{ color: 'white', fontSize: 36 }}>🎮 Экономическая игра</h1>

      <div style={{ display: 'flex', gap: 30 }}>
        <div style={{ background: '#1e1e2f', color: 'white', padding: 20, borderRadius: 16, width: 260, boxShadow: '0 10px 25px rgba(0,0,0,0.4)' }}>
          <h2 style={{ color: '#ff4d4d' }}>🔴 Красные</h2>
          <input placeholder="Имя" value={redInput} onChange={(e) => setRedInput(e.target.value)} style={{ width: '100%', padding: 10, borderRadius: 8, border: 'none', marginBottom: 10 }}/>
          <button onClick={() => addPlayer(redTeam, setRedTeam, redInput, setRedInput)}>Добавить</button>
          {redTeam.map((p, i) => <div key={i} style={{ marginTop: 6 }}>{p}</div>)}
        </div>

        <div style={{ background: '#1e1e2f', color: 'white', padding: 20, borderRadius: 16, width: 260, boxShadow: '0 10px 25px rgba(0,0,0,0.4)' }}>
          <h2 style={{ color: '#4da6ff' }}>🔵 Синие</h2>
          <input placeholder="Имя" value={blueInput} onChange={(e) => setBlueInput(e.target.value)} style={{ width: '100%', padding: 10, borderRadius: 8, border: 'none', marginBottom: 10 }}/>
          <button onClick={() => addPlayer(blueTeam, setBlueTeam, blueInput, setBlueInput)}>Добавить</button>
          {blueTeam.map((p, i) => <div key={i} style={{ marginTop: 6 }}>{p}</div>)}
        </div>
      </div>

      <button onClick={() => navigate('/round1')} style={{ padding: '14px 28px', fontSize: 18, borderRadius: 12, background: 'linear-gradient(135deg, #ff512f, #dd2476)', color: 'white', border: 'none', cursor: 'pointer' }}>
        🚀 Начать игру
      </button>
    </div>
  );
}
