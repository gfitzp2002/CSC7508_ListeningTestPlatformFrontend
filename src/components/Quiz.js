import React, { useState, useEffect, useContext } from 'react';
import { Container, Button, Row, Col, Accordion, Card } from 'react-bootstrap';
import { getQuiz } from '../service/QuizService';
import { QuizContext } from '../context/QuizContext';
import Question from '../components/Question';
import Scoreboard from '../components/Scoreboard';
import ResultDisplay from '../components/ResultDisplay';
import QuizInfoModal from './QuizInfoModel';

function Quiz() {
    const [quizData, setQuizData] = useState(null);
    const [questionIndex, setQuestionIndex] = useState(0);
    const [results, setResults] = useState([]);
    const [isComplete, setIsComplete] =useState(false);
    const [score, setScore] = useState(0);
    const { categoryId } = useContext(QuizContext);
    const [showModal, setShowModal] = useState(false);
    
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
    
    
    //record results in results array - to improve: map to questionId? Will need questionResponse object modified potentially
    const handleSubmission = (result) => {
        setResults((prev) => [...prev, {questionIndex, result}]);
        setQuestionIndex((prev) => prev + 1);
        
    };

    // Function to toggle the modal
    const toggleModal = () => setShowModal(!showModal);

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
        
        <Container className='text-center'> 
            <Container style={{ backgroundColor: '#FFE1A8' }}>   
                <Row>
                    <Col className="justify-content-lg-end mt-3">
                        <Button variant="primary" size="lg" onClick={toggleModal}>Instructions</Button>
                    </Col>
                </Row>

                <Row className='mb-5 mt-5'> 
                    <Col>
                        <h2>{quizData.categoryName}</h2>
                    </Col>
                </Row>
                <Row>
                    <Col>                                            
                        <Scoreboard score={score} />                    
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Question
                            questionData={quizData.questionSet[questionIndex]}
                            onSubmission={handleSubmission}
                        />
                    </Col>
                </Row>
            </Container>
            <QuizInfoModal 
                show={showModal} 
                onHide={toggleModal} 
                description={quizData ? quizData.description : ''} 
            /> 
        </Container>
        
    );

}

export default Quiz;
