import { createContext, useState } from 'react';

const QuizContext = createContext();

const QuizProvider = ({ children }) => {
  const [isCorrect, setIsCorrect] = useState(null);

  const updateIsCorrect = (value) => {
    setIsCorrect(value);
  };

  const contextValues = {
    isCorrect,
    updateIsCorrect: setIsCorrect,
  };

  return <QuizContext.Provider value={contextValues}>{children}</QuizContext.Provider>;
};

export { QuizContext, QuizProvider };
