import React, { useState, useEffect } from 'react';
import { getQuiz } from './QuizService';
import Question from './Question';
import ResultDisplay from './ResultDisplay';



function Quiz({categoryId}) {
    const [quizData, setQuizData] = useState(null);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [results, setResults] = useState([]);
    //const [score, setScore] = useState(0); - Separate Score component? Should 1 = 10 or 100 etc?
    
    useEffect(() => {
        const fetchQuizData = async () => {
        const data = await getQuiz(categoryId);
            if (data) {
                setQuizData(data);
                //initialise new results array that is equal to number of questions
                //setResults(new Array(data.questionSet.length).fill(null));
            }
        };

        fetchQuizData();
    }, [categoryId]);

    useEffect(() => {
        console.log('Results: ' + JSON.stringify(results));
    }, [results]);

    if(!quizData) {
        return <h1>Loading.....</h1>;
    }

    //record results in results array - to improve: map to questionId? Will need questionResponse object modified potentially
    const handleSubmission = (result) => {
        setResults((prev) => [...prev, {questionIndex, result}]);
        setQuestionIndex((prev) => prev + 1);
        
    };
    



    return (
        <main className='container text-center'>
            <div>
                <h1>Question {questionIndex + 1} of {quizData.questionSet.length}</h1>
            </div>
            {questionIndex < quizData.questionSet.length ? (
                <Question
                    questionData={quizData.questionSet[questionIndex]}
                    onSubmission={handleSubmission}
                />              
            ) : (
                <ResultDisplay results={results} />
            )}
        </main>

    );

}

export default Quiz;
