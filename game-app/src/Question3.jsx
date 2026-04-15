// ================= Question3.jsx =================
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import p1 from "./imgs/photka.png"
import p2 from "./imgs/photka2.png"
import p3 from "./imgs/photka3.png"
import p4 from "./imgs/photka4.png"
import p5 from "./imgs/photka5.png"
import p6 from "./imgs/photka6.png"
import p7 from "./imgs/photka7.png"
import p8 from "./imgs/photka8.png"
import p9 from "./imgs/photka9.png"

// Здесь будут ребусы (картинки добавишь сам)
const questions = [
  { question: p1, answer: "конкуренция" },
  { question: p2, answer: "предприниматель" },
  { question: p3, answer: "заказ" },
  { question: p4, answer: "деньги" },
  { question: p5, answer: "товар" },
  { question: p6, answer: "выручка" },
  { question: p7, answer: "ликвидность" },
  { question: p8, answer: "БАНКРОТ" },
  { question: p9, answer: "ИМПОРТ" },
];

export default function Question3() {
  const navigate = useNavigate();
  const location = useLocation();
  const prevScore = location.state?.score || { red: 0, blue: 0 };

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [phase, setPhase] = useState('idle');
  const [time, setTime] = useState(30);
  const [winner, setWinner] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState({ ...prevScore });

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    let timer;
    if (phase === 'timer' && time > 0) {
      timer = setTimeout(() => setTime(time - 1), 1000);
    }
    if (time === 0 && phase === 'timer') {
      setPhase('buzz');
    }
    return () => clearTimeout(timer);
  }, [time, phase]);

  const startQuestion = () => {
    setTime(30);
    setPhase('timer');
    setWinner(null);
    setShowAnswer(false);
  };

  const handleClickTeam = (team) => {
    if (winner) return;
    setWinner(team);
    setPhase('answered');
  };

  const handlePass = () => {
    if (winner) return;
    const redPoints = score.red;
    const bluePoints = score.blue;
    if (redPoints >= bluePoints) {
      setScore({ ...score, blue: bluePoints + 3 });
    } else {
      setScore({ ...score, red: redPoints + 3 });
    }
    setPhase('answered');
  };

  const showAnswerAndScore = () => {
    setShowAnswer(true);
  };

  const givePoint = () => {
    if (!winner) return;
    setScore({ ...score, [winner]: score[winner] + 3 });
  };

  const nextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
      setPhase('idle');
      setWinner(null);
      setShowAnswer(false);
    } else {
      navigate('/roundend', { state: { score } });
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #1a1a1a, #000000)', color: 'white', textAlign: 'center', padding: 20 }}>
      <h2 style={{ fontSize: 32 }}>🔴 {score.red} : {score.blue} 🔵</h2>

      {/* Здесь будет картинка ребуса */}
      <div style={{ marginTop: 20, marginBottom: 20 }}>
        <img src={currentQuestion.question} alt="rebus" style={{ maxWidth: '80%' }} />
      </div>

      {phase === 'idle' && <button onClick={startQuestion} style={{ fontSize: 22, padding: '12px 24px' }}>Начать</button>}
      {phase === 'timer' && <h2 style={{ fontSize: 60 }}>⏳ {time}</h2>}

      {phase === 'buzz' && !winner && (
        <div style={{ display: 'flex', height: '60vh', marginTop: 20 }}>
          <div
            onClick={() => handleClickTeam('red')}
            style={{ flex: 1, background: 'red', opacity: 0.8, cursor: 'pointer' }}
            onMouseEnter={(e) => e.target.style.opacity = 1}
            onMouseLeave={(e) => e.target.style.opacity = 0.8}
          />
          <div
            onClick={() => handleClickTeam('blue')}
            style={{ flex: 1, background: 'blue', opacity: 0.8, cursor: 'pointer' }}
            onMouseEnter={(e) => e.target.style.opacity = 1}
            onMouseLeave={(e) => e.target.style.opacity = 0.8}
          />
        </div>
      )}

      {phase === 'buzz' && !winner && (
        <button onClick={handlePass} style={{ marginTop: 20, fontSize: 18, padding: '8px 16px' }}>
          Передать другой команде (3 балла)
        </button>
      )}

      {winner && (
        <div style={{ marginTop: 20 }}>
          <h2 style={{ fontSize: 36 }}>
            {winner === 'red' ? '🔴 Красные' : '🔵 Синие'} ответили
          </h2>

          {!showAnswer && (
            <button onClick={showAnswerAndScore} style={{ fontSize: 22, padding: '10px 20px' }}>
              Показать ответ
            </button>
          )}

          {showAnswer && (
            <div>
              <p style={{ fontSize: 36, margin: '20px 0' }}>{currentQuestion.answer}</p>
              <button onClick={givePoint} style={{ fontSize: 24, padding: '12px 24px' }}>
                +3 балла
              </button>

              <div style={{ marginTop: 20 }}>
                <button onClick={nextQuestion} style={{ fontSize: 20, padding: '10px 20px' }}>
                  Следующий ребус
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}