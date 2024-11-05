/*
import React, { useState } from 'react';
import WelcomeScreen from './components/welcomeScreen/WelcomeScreen';
import CategorySelection from './components/categorySelection/CategorySelection';
import QuizScreen from './components/quizScreen/QuizScreen';
import ResultsScreen from './components/resultsScreen/ResultsScreen';
import generateQuestions from './utils/generateQuestions';



const Home = () => {
  const [screen, setScreen] = useState('welcome');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);

  

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setQuestions(generateQuestions(category));
    setUserAnswers([]);
    setScore(0);
    setScreen('quiz');
  };


  const handleAnswerSubmit = (isCorrect, userAnswer) => {
    setUserAnswers([...userAnswers, { userAnswer, isCorrect }]);
    if (isCorrect) setScore(score + 1);

    if (userAnswers.length + 1 === questions.length) {
      setScreen('results');
    }
  };

  
  // Handles going back to the category selection screen
  const handleBackToCategory = () => {
    setScreen('categorySelection');
    setSelectedCategory(null); // Clear selected category for new selection
    setUserAnswers([]); // Clear user answers for a new quiz
    setScore(0); // Reset score for a fresh start
  };

  const startQuiz = () => setScreen('categorySelection');
  const restartQuiz = () => handleBackToCategory(); // Calls the function to handle reset state

  return (
    <div className="app-container">
      {screen === 'welcome' && <WelcomeScreen onStart={startQuiz} />}
      {screen === 'categorySelection' && <CategorySelection onSelectCategory={handleCategorySelect} />}
      {screen === 'quiz' && selectedCategory && (
        <QuizScreen questions={questions} onBack={handleBackToCategory} onSubmitAnswer={handleAnswerSubmit} />
      )}
      {screen === 'results' && (
        <ResultsScreen questions={questions} answers={userAnswers} score={score} onRestart={restartQuiz} />
      )}
    </div>
  );
};

export default Home;
*/


import React, { useState } from 'react';
import WelcomeScreen from './components/welcomeScreen/WelcomeScreen';
import CategorySelection from './components/categorySelection/CategorySelection';
import QuizScreen from './components/quizScreen/QuizScreen';
import ResultsScreen from './components/resultsScreen/ResultsScreen';
import generateQuestions from './utils/generateQuestions';

const Home = () => {
  const [screen, setScreen] = useState('welcome');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [error, setError] = useState(null); // State for error messages

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    const generatedQuestions = generateQuestions(category);

    if (!Array.isArray(generatedQuestions) || generatedQuestions.length === 0) {
      setError("Error: No questions generated for this category.");
      return; // Prevent further execution if there are no questions
    }

    setQuestions(generatedQuestions);
    setUserAnswers([]);
    setScore(0);
    setScreen('quiz');
    setError(null); // Clear error if category is valid
  };

  const handleAnswerSubmit = (isCorrect, userAnswer) => {
    if (!questions.length) {
      setError("Error: No questions available to answer.");
      return; // Prevent submitting if there are no questions
    }

    setUserAnswers([...userAnswers, { userAnswer, isCorrect }]);
    if (isCorrect) setScore(score + 1);

    if (userAnswers.length + 1 === questions.length) {
      setScreen('results');
    }
  };

  const handleBackToCategory = () => {
    setScreen('categorySelection');
    setSelectedCategory(null); // Clear selected category for new selection
    setUserAnswers([]); // Clear user answers for a new quiz
    setScore(0); // Reset score for a fresh start
    setError(null); // Clear any error when going back to categories
  };

  const startQuiz = () => setScreen('categorySelection');
  const restartQuiz = () => handleBackToCategory(); // Calls the function to handle reset state

  return (
    <div className="app-container">
      {error && <div className="error-message">{error}</div>} {/* Render error messages */}
      {screen === 'welcome' && <WelcomeScreen onStart={startQuiz} />}
      {screen === 'categorySelection' && <CategorySelection onSelectCategory={handleCategorySelect} />}
      {screen === 'quiz' && selectedCategory && (
        <QuizScreen
          questions={questions}
          onBack={handleBackToCategory}
          onSubmitAnswer={handleAnswerSubmit}
        />
      )}
      {screen === 'results' && (
        <ResultsScreen
          questions={questions}
          answers={userAnswers}
          score={score}
          onRestart={restartQuiz}
        />
      )}
    </div>
  );
};

export default Home;
