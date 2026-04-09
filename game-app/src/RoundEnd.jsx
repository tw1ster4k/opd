// ================= RoundEnd.jsx =================
import { useNavigate, useLocation } from "react-router-dom";

export default function RoundEnd() {
  const navigate = useNavigate();
  const location = useLocation();
  const score = location.state?.score || { red: 0, blue: 0 };
  const { red, blue } = score;

  const handleNextRound = () => {
    navigate('/round2');
  };

  // Рассчет высот колонок
  let redHeight = 150;
  let blueHeight = 150;
  let winnerText = '';

  if (red > blue) {
    redHeight = 180;
    blueHeight = 120;
    winnerText = '🔴 Красные впереди!';
  } else if (blue > red) {
    blueHeight = 180;
    redHeight = 120;
    winnerText = '🔵 Синие впереди!';
  } else {
    redHeight = 150;
    blueHeight = 150;
    winnerText = 'Ничья!';
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #141e30, #243b55)',
      color: 'white'
    }}>
      <h1 style={{ fontSize: 50, marginBottom: 40 }}>🏆 Раунд завершен</h1>
      <h2 style={{ fontSize: 32, marginBottom: 20 }}>{winnerText}</h2>

      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 40, height: 300 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ height: redHeight, width: 100, background: 'red', borderRadius: 12, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 24 }}>
            🔴 {red}
          </div>
          <span style={{ marginTop: 10, fontSize: 20 }}>Красные</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ height: blueHeight, width: 100, background: 'blue', borderRadius: 12, display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: 24 }}>
            🔵 {blue}
          </div>
          <span style={{ marginTop: 10, fontSize: 20 }}>Синие</span>
        </div>
      </div>

      <button onClick={handleNextRound} style={{ marginTop: 50, fontSize: 24, padding: '12px 28px', borderRadius: 12, background: 'linear-gradient(135deg, #ff512f, #dd2476)', border: 'none', color: 'white', cursor: 'pointer' }}>
        Перейти ко второму раунду
      </button>
    </div>
  );
}