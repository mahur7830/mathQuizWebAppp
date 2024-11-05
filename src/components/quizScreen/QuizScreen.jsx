import React, { useState } from 'react';
import './quiz.css';

const QuizScreen = ({ questions, onBack, onSubmitAnswer, onGoToCategory }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const question = questions[currentQuestion];

  const submitAnswer = () => {
    // Validate input
    if (userAnswer.trim() === '') {
      setErrorMessage('Please enter an answer.');
      return;
    }

    const correctAnswer = question.answer;
    const isAnswerCorrect = parseInt(userAnswer) === correctAnswer;
    setIsCorrect(isAnswerCorrect);
    setShowPopup(true);
    setAnswerSubmitted(true);
    setErrorMessage(''); // Clear any previous error message
    onSubmitAnswer(isAnswerCorrect, userAnswer); // Correctly pass userAnswer

    // Debugging
    console.log("User Answer:", userAnswer);
    console.log("Correct Answer:", correctAnswer);
  };

  const handleCountingAnswer = (selectedAnswer) => {
    setUserAnswer(selectedAnswer);
    setAnswerSubmitted(true);
    setIsCorrect(selectedAnswer === question.answer);
    setErrorMessage(''); // Clear any previous error message
    onSubmitAnswer(selectedAnswer === question.answer, selectedAnswer); // Pass selected answer
    setShowPopup(true);
  };

  const handleContinue = () => {
    setShowPopup(false);
    setUserAnswer('');
    setAnswerSubmitted(false);
    setErrorMessage(''); // Clear error message for next question

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onGoToCategory();
    }
  };

  const inputNumber = (num) => {
    if (!answerSubmitted) {
      setUserAnswer((prevAnswer) => prevAnswer + num.toString());
      setErrorMessage(''); // Clear error message when user inputs
    }
  };

  const undo = () => {
    if (!answerSubmitted) {
      setUserAnswer((prevAnswer) => prevAnswer.slice(0, -1));
    }
  };

  const popupStyle = {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: '20px',
    padding: '20px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    zIndex: 1000,
    width: '90%',
    maxWidth: '400px',
    borderRadius: '10px',
    backgroundColor: isCorrect ? '#bfffbf' : '#FF8080',
    border: isCorrect ? '1px solid #c3e6cb' : '1px solid #f5c6cb',
  };

  const messageStyle = {
    alignSelf: 'top',
    marginBottom: '15px',
    fontWeight: 'bold',
  };

  return (
    <div className="quiz-screen">
      <h2 className="questionCount">Question: {currentQuestion + 1}</h2>

      {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error message */}

      {question.type === 'counting' ? (
        <div className="counting-question">
          <div className="question-text">{question.question}</div>
          <div className="counting-options">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map((option) => (
              <button
                key={option}
                className="option-button"
                onClick={() => handleCountingAnswer(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="answer-input">
          <div className="question">{question.question} = ?</div>
          <input
            type="text"
            value={userAnswer}
            readOnly={answerSubmitted}
            className="answer-field"
            placeholder="Enter answer here"
          />
          <div className="number-pad">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '-', '.'].map((num) => (
              <button key={num} onClick={() => inputNumber(num)} className="number-button">
                {num}
              </button>
            ))}
            <button
              className="btn undo-button"
              onClick={undo}
              style={{
                color:"#000000",
                backgroundColor: "#b4b4b4",
                transition: "background-color 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#8a8a8a")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#b4b4b4")}
            >
              Undo
            </button>
            <button
              className="btn submit-button"
              onClick={submitAnswer}
              style={{
                color:"#000000",
                backgroundColor: "#b4b4b4",
                transition: "background-color 0.3s",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#8a8a8a")}
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#b4b4b4")}
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {showPopup && (
        <div className={`popup ${isCorrect ? 'correct' : 'incorrect'}`} style={popupStyle}>
          <div className="popup-content">
            <p className="message" style={messageStyle}>{isCorrect ? 'Correct!' : 'Incorrect!'}</p>
            <button onClick={handleContinue} className="continue-button">
              Continue
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizScreen;
