
import React from 'react';
import './result.css';

const ResultsScreen = ({ questions, answers, score, onRestart }) => {
  // Error handling
  if (!Array.isArray(questions) || !Array.isArray(answers)) {
    return <div className="error-message">Error: Invalid results data.</div>;
  }

  if (questions.length === 0) {
    return <div className="error-message">Error: No questions available.</div>;
  }

  if (answers.length !== questions.length) {
    return <div className="error-message">Error: Mismatch between questions and answers.</div>;
  }

  return (
    <div className="results-screen">
      <p className='result'>Results</p>
      <div className="result-list">
        {questions.map((q, index) => (
          <div key={index} className="result-item">
            Correct answer: {q.question} = {q.answer} - Your Answer: {answers[index].userAnswer}{' '}
            <span className={answers[index].isCorrect ? 'correct-symbol' : 'incorrect-symbol'}>
              {answers[index].isCorrect ? '✓' : '✗'}
            </span>
          </div>
        ))}
      </div>
      <p className='score'>Score: {score} / {questions.length}</p>
      <button onClick={onRestart} className="back-to-category-button">Back to Categories</button>
    </div>
  );
};

export default ResultsScreen;
