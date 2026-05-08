// ================= FinalScreen.jsx =================
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function FinalScreen() {
  const location = useLocation();
  const navigate = useNavigate();

  const score = location.state?.score || { red: 0, blue: 0 };
  const redTeam = location.state?.redTeam || [];
  const blueTeam = location.state?.blueTeam || [];

  const { red, blue } = score;

  const [showCup, setShowCup] = useState(false);

  let winner = null;
  let winnerPlayers = [];

  if (red > blue) {
    winner = 'red';
    winnerPlayers = redTeam;
  } else if (blue > red) {
    winner = 'blue';
    winnerPlayers = blueTeam;
  }

  useEffect(() => {
    const timer = setTimeout(() => setShowCup(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(circle, #1a2a6c, #b21f1f, #fdbb2d)',
      color: 'white',
      textAlign: 'center',
      padding: 20,
      overflow: 'hidden'
    }}>

      <h1 style={{ fontSize: 60, marginBottom: 20 }}>🏆 ИГРА ОКОНЧЕНА</h1>

      {winner ? (
        <>
          <h2 style={{ fontSize: 40, marginBottom: 20 }}>
            Победили: {winner === 'red' ? '🔴 Красные' : '🔵 Синие'}
          </h2>

          {/* Кубок */}
          {showCup && (
            <div style={{
              fontSize: 100,
              animation: 'pop 0.6s ease-out'
            }}>
              🏆
            </div>
          )}

          {/* Игроки */}
          <div style={{ fontSize: 26, marginBottom: 30 }}>
            {winnerPlayers.length > 0 ? (
              winnerPlayers.map((p, i) => (
                <div key={i}>{p}</div>
              ))
            ) : (
              <div>Игроки не указаны</div>
            )}
          </div>
        </>
      ) : (
        <h2 style={{ fontSize: 40 }}>🤝 Ничья!</h2>
      )}

      <div style={{ fontSize: 28, marginBottom: 40 }}>
        Финальный счет: 🔴 {red} : {blue} 🔵
      </div>

      {/* Конфетти */}
      {winner && (
        <div className="confetti-container">
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} className="confetti" />
          ))}
        </div>
      )}

      <button
        onClick={() => navigate('/')}
        style={{
          fontSize: 22,
          padding: '12px 24px',
          borderRadius: 12,
          border: 'none',
          background: 'black',
          color: 'white',
          cursor: 'pointer'
        }}
      >
        В меню
      </button>

      <style>{`
        @keyframes pop {
          0% { transform: scale(0); }
          100% { transform: scale(1); }
        }

        .confetti-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .confetti {
          position: absolute;
          width: 10px;
          height: 10px;
          background: hsl(${Math.random() * 360}, 100%, 50%);
          top: -10px;
          left: ${Math.random() * 100}%;
          animation: fall ${2 + Math.random() * 3}s linear infinite;
        }

        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}