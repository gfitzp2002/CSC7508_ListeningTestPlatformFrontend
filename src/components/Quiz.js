import React, { useEffect, useContext, useState } from 'react';
import { Container, Button, Row, Col, Spinner, Card } from 'react-bootstrap';
import { QuizContext } from '../context/QuizContext';
import Question from '../components/Question';
import Scoreboard from '../components/Scoreboard';
import ResultDisplay from '../components/ResultDisplay';
import QuizInfoModal from './QuizInfoModel';
import '../index.css';

function Quiz() {
    const { categoryId, quizData, quizRecord, questionIndex, startQuiz, isComplete } = useContext(QuizContext);
    const [showModal, setShowModal] = useState(false);
    
    //console.log("Quiz component, quiz data: " + JSON.stringify(quizData));
    //console.log("Quiz component, quiz [0]: " + JSON.stringify(quizData.questionSet[0]));
    //console.log("Quiz component, question index: " + questionIndex);
    console.log("Quiz component, quiz record " + JSON.stringify(quizRecord));
    
    const toggleModal = () => setShowModal(!showModal);


    if (!categoryId || !quizData) {
        return ( <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>       
                )}
        
    if (isComplete) {
        return (
            <main className='container text-center' >
                <Container className="mb-3" style={{color:"#FFFFFF"}}><h1>You Scored: {quizRecord.calculateScore()}!</h1></Container>
                <ResultDisplay results={quizRecord.calculateResults()}  />               
                <Button variant='primary' onClick={startQuiz}>Play Again?</Button>
            </main>
        );
    }

    return (
        <Card className='text-center roboto-black' style={{ background: 'linear-gradient(to bottom, #03045e, #023e8a)'}} > 
            <Container style={{borderRadius: '10px', border: '1px solid #fe7e13'}} >
                <Row>   
                    <Row className='mb-5 mt-5' style={{color:'white'}}> 
                            <Col>
                                <Row>
                                    <h3 className='roboto-black-italic' >{quizData.categoryName}</h3>
                                    <hr />
                                </Row>
                                <Row>
                                    <Col><Button variant="primary" size="sm" onClick={toggleModal} >Read Me </Button></Col>
                                    <Col></Col>                                 
                                </Row>
                            </Col>
                            <Col>
                                <Row>
                                    <Col><Scoreboard score={quizRecord.calculateScore()} /> </Col>
                                    <Col></Col>
                                </Row>                                            
                                                   
                            </Col>
                    </Row>
                    <Row>
                     <Question questionData={quizData.questionSet[questionIndex]} />                      
                    </Row>
                    <QuizInfoModal 
                        show={showModal} 
                        onHide={toggleModal} 
                        description={quizData ? quizData.description : ''} 
                    /> 
                </Row>
            </Container>
        </Card>
    );
}

export default Quiz;
