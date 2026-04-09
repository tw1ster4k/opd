import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RoundIntro() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/game/question1');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 50,
      color: 'white',
      background: 'linear-gradient(135deg, #141e30, #243b55)'
    }}>
      РАЗМИНКА
    </div>
  );
}