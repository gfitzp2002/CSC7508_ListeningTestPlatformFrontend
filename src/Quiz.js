import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { getQuiz } from './QuizService';
import Question from './Question';
import Scoreboard from './Scoreboard';
import ResultDisplay from './ResultDisplay';

function Quiz({categoryId}) {
    const [quizData, setQuizData] = useState(null);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [results, setResults] = useState([]);
    const [isComplete, setIsComplete] =useState(false);
    const [score, setScore] = useState(0);
    
    const getQuizData = async () => {
        const data = await getQuiz(categoryId);
        if (data) {
            setQuizData(data);
            setResults([]);
            setQuestionIndex(0);
            setIsComplete(false);
        }
    };
    
    const calculateScore = () => {
        return results.reduce((acc, result) => (result.result ? acc + 1 : acc), 0);
      };
    
    useEffect(() => {
        getQuizData();
    }, [categoryId]);

    useEffect(() => {
        console.log('Results: ' + JSON.stringify(results));
        if (quizData && questionIndex >= quizData.questionSet.length){
            setIsComplete(true);
        }
        setScore(calculateScore());
    }, [questionIndex,results, quizData]);

    
    //record results in results array - to improve: map to questionId? Will need questionResponse object modified potentially
    const handleSubmission = (result) => {
        setResults((prev) => [...prev, {questionIndex, result}]);
        setQuestionIndex((prev) => prev + 1);
        
    };

    //loading screen if now data
    if(!quizData) {
        return <h1>Loading.....</h1>;
    }
    
    //If no questions left - display the final result
    if(isComplete) {
        return (
          <main className='container text-center'>
            <Container><h1>You Scored: {score}!</h1></Container>
            <ResultDisplay results={results} />
            <Button variant='primary' onClick={getQuizData}>Play Again?</Button>
          </main>
        );
      }

    return (
        <Container className='text-center' style={{ backgroundColor: '#FFE1A8' }}>
                <Container className='mt-4 mb-4'>
                <Scoreboard
                        score={score}
                    />
                </Container>
                <Question
                    questionData={quizData.questionSet[questionIndex]}
                    onSubmission={handleSubmission}
                />
        </Container>

    );

}

export default Quiz;
