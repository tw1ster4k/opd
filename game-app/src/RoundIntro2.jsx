// ================= RoundIntro2.jsx =================
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function RoundIntro2() {
  const navigate = useNavigate();
  const location = useLocation();
  const score = location.state?.score || { red: 0, blue: 0 };

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/game/question2', { state: { score } });
    }, 3000); // 3 секунды перебивки

    return () => clearTimeout(timer);
  }, [navigate, score]);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
      color: 'white',
      flexDirection: 'column'
    }}>
      <h1 style={{ fontSize: 48, marginBottom: 20 }}>🏁 Раунд 2</h1>
      <h2 style={{ fontSize: 36 }}>ВОПРОС-ОТВЕТ</h2>
      <p style={{ marginTop: 30, fontSize: 24 }}>Приготовьтесь! Начало через 3 секунды...</p>
    </div>
  );
}
