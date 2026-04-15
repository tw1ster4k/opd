// ================= Question2.jsx =================
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const questions = [
  { question: "Что считать в чужом кармане нехорошо, но очень интересно?", answer: "Счёт чужих денег" },
  { question: "Делать это ни в чужом, ни тем паче в своём доме не стоит: деньгу выжить можно", answer: "Тратить зря" },
  { question: "Что сколачивают из денег?", answer: "Состояние / капитал" },
  { question: "В Японии богатые гребут деньги граблями (бамбуковыми). А чем наши богачи гребут деньги?", answer: "Лопатами" },
  { question: "«Монета» для казино – это ... Что?", answer: "Фишка" },
  { question: "Что означает «наказать деньгами?", answer: "Штрафовать" },
  { question: "Какой песенный остров весь покрыт американской валютой?", answer: "Долларовый остров" },
  { question: "Верно ли, что финансовыми воротилами называют тех, кого воротит от денег?", answer: "Нет, это те, кто зарабатывает большие деньги" },
  { question: "Как называется ожерелье из монет?", answer: "Монетница / ожерелье" },
  { question: "И марка российского самолёта, и вьетнамская копейка.", answer: "Ан-2 / донг" },
];

export default function Question2() {
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
      setScore({ ...score, blue: bluePoints + 2 });
    } else {
      setScore({ ...score, red: redPoints + 2 });
    }
    setPhase('answered');
  };

  const showAnswerAndScore = () => {
    setShowAnswer(true);
  };

  const givePoint = () => {
    if (!winner) return;
    setScore({ ...score, [winner]: score[winner] + 2 });
  };

  const nextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
      setPhase('idle');
      setWinner(null);
      setShowAnswer(false);
    } else {
      navigate('/roundend', { state: { score, round:2 } });
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #000000, #434343)', color: 'white', textAlign: 'center', padding: 20 }}>
      <h2 style={{ fontSize: 32 }}>🔴 {score.red} : {score.blue} 🔵</h2>
      <h1 style={{ fontSize: 42, marginTop: 20 }}>{currentQuestion.question}</h1>

      {phase === 'idle' && <button onClick={startQuestion} style={{ fontSize: 22, padding: '12px 24px' }}>Начать</button>}
      {phase === 'timer' && <h2 style={{ fontSize: 60 }}>⏳ {time}</h2>}

      {phase === 'buzz' && !winner && (
        <div style={{ display: 'flex', height: '60vh', marginTop: 20 }}>
          <div
            onClick={() => handleClickTeam('red')}
            style={{ flex: 1, background: 'red', opacity: 0.8, cursor: 'pointer', transition: '0.2s' }}
            onMouseEnter={(e) => e.target.style.opacity = 1}
            onMouseLeave={(e) => e.target.style.opacity = 0.8}
          />
          <div
            onClick={() => handleClickTeam('blue')}
            style={{ flex: 1, background: 'blue', opacity: 0.8, cursor: 'pointer', transition: '0.2s' }}
            onMouseEnter={(e) => e.target.style.opacity = 1}
            onMouseLeave={(e) => e.target.style.opacity = 0.8}
          />
        </div>
      )}

      {phase === 'buzz' && !winner && (
        <button onClick={handlePass} style={{ marginTop: 20, fontSize: 18, padding: '8px 16px' }}>Передать другой команде (2 балла)</button>
      )}

      {winner && (
        <div style={{ marginTop: 20 }}>
          <h2 style={{ fontSize: 36 }}>{winner === 'red' ? '🔴 Красные' : '🔵 Синие'} ответили</h2>
          {!showAnswer && <button onClick={showAnswerAndScore} style={{ fontSize: 22, padding: '10px 20px' }}>Показать ответ</button>}
          {showAnswer && (
            <div>
              <p style={{ fontSize: 36, margin: '20px 0' }}>{currentQuestion.answer}</p>
              <button onClick={givePoint} style={{ fontSize: 24, padding: '12px 24px' }}>+2 балла</button>
              <div style={{ marginTop: 20 }}>
                <button onClick={nextQuestion} style={{ fontSize: 20, padding: '10px 20px' }}>Следующий вопрос</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
