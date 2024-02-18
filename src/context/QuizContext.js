import { createContext, useState, useEffect } from 'react';
import QuizRecord from '../models/QuizRecord';
import { getQuiz, storeQuizRecord } from '../service/QuizService';

const QuizContext = createContext();

const QuizProvider = ({ children }) => {
  const [quizRecord, setQuizRecord] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [categoryId, setCategoryId] = useState(null);
  const [quizData, setQuizData] = useState(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if(categoryId !== null) {
      startQuiz();
    }    
  }, [categoryId]);

  useEffect(() => {
    if (quizData && questionIndex >= quizData.questionSet.length){
        setIsComplete(true);
        quizRecord.score = quizRecord.calculateScore();
        console.log("Quiz Record: " + JSON.stringify(quizRecord));
        storeQuizRecord(quizRecord);
    }
   
}, [questionIndex, quizData]);

     // Cleanup function to reset quiz context's state
  useEffect(() => {
    return () => {
        resetQuizContext();
    };
  }, []);

  
  const startQuiz = async () => {
    //fetch Quiz data
    const data = await getQuiz(categoryId);
    if(data) {
      setQuizData(data);
      //create new quiz record
      const username = localStorage.getItem('username');
      const newQuizRecord = new QuizRecord(username, categoryId);
      //initialize context values
      setQuizRecord(newQuizRecord);
      setQuestionIndex(0);
      setIsComplete(false);
      console.log("Quiz Context startQuiz called!");
      console.log("Quiz Context Quiz Record - " + JSON.stringify(newQuizRecord));
    }    
    //console.log("Quiz Context, questionData: " + JSON.stringify(quizData));
  };

  const updateQuizRecord = (questionResponse) => {
    quizRecord.addResponse(questionResponse); // Update the quiz record with the response
    setQuizRecord(quizRecord); //update state 
    setQuestionIndex(prevIndex => prevIndex + 1); // Move to the next question
  };

  const resetQuizContext = () => {
    setQuizRecord(null);
    setQuestionIndex(0);
    setCategoryId(null);
    setQuizData(null);
    setIsComplete(false);
  }
  
  const contextValues = {
    questionIndex,
    quizRecord,
    startQuiz,
    updateQuizRecord,
    categoryId,
    setCategoryId,
    quizData,
    resetQuizContext,
    isComplete
  };

  return <QuizContext.Provider value={contextValues}>{children}</QuizContext.Provider>;
};

export { QuizContext, QuizProvider };
