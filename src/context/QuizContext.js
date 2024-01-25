import { createContext, useState } from 'react';

const QuizContext = createContext();

const QuizProvider = ({ children }) => {
  const [isCorrect, setIsCorrect] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  
  const updateIsCorrect = (value) => {
    setIsCorrect(value);
  };

  const updateCategoryId = (id) => {
    setCategoryId(id);
  };

  const contextValues = {
    isCorrect,
    updateIsCorrect,
    categoryId,
    updateCategoryId,
  };

  return <QuizContext.Provider value={contextValues}>{children}</QuizContext.Provider>;
};

export { QuizContext, QuizProvider };
