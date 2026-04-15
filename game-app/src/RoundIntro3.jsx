import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function RoundIntro3() {
  const navigate = useNavigate();
  const location = useLocation();
  const score = location.state?.score || { red: 0, blue: 0 };

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/game/question3', { state: { score } });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate, score]);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'radial-gradient(circle, #ff512f, #dd2476)',
      color: 'white',
      textAlign: 'center',
      animation: 'pulse 1.5s infinite alternate'
    }}>
      <h1 style={{ fontSize: 52, marginBottom: 20 }}>🧠 Раунд 3</h1>
      <h2 style={{ fontSize: 40 }}>РЕБУСЫ</h2>
      <p style={{ marginTop: 30, fontSize: 24 }}>
        Думай быстро! У вас 30 секунд...
      </p>

      <style>
        {`@keyframes pulse {
          from { transform: scale(1); }
          to { transform: scale(1.05); }
        }`}
      </style>
    </div>
  );
}