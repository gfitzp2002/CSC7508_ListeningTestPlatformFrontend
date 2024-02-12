import React, { useEffect, useContext, useState } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { QuizContext } from '../context/QuizContext';
import Question from '../components/Question';
import Scoreboard from '../components/Scoreboard';
import ResultDisplay from '../components/ResultDisplay';
import QuizInfoModal from './QuizInfoModel';

function Quiz() {
    const { categoryId, quizData, quizRecord, questionIndex, startQuiz, updateQuizRecord, isComplete } = useContext(QuizContext);
    const [showModal, setShowModal] = useState(false);
    
    //console.log("Quiz component, quiz data: " + JSON.stringify(quizData));
    //console.log("Quiz component, quiz [0]: " + JSON.stringify(quizData.questionSet[0]));
    //console.log("Quiz component, question index: " + questionIndex);
    console.log("Quiz component, quiz record " + JSON.stringify(quizRecord));
    
    const toggleModal = () => setShowModal(!showModal);

    if (!categoryId || !quizData) {
        return <h1>Loading.....</h1>;       
    }
        
    if (isComplete) {
        return (
            <main className='container text-center'>
                <Container><h1>You Scored: {quizRecord.calculateScore()}!</h1></Container>
                <ResultDisplay results={quizRecord.calculateResults()} />               
                <Button variant='primary' onClick={startQuiz}>Play Again?</Button>
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
                        <Scoreboard score={quizRecord.calculateScore()} />                    
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Question
                            questionData={quizData.questionSet[questionIndex]}                           
                            
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
