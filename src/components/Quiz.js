import React, { useEffect, useContext, useState } from 'react';
import { Container, Button, Row, Col, Spinner, Card, ProgressBar } from 'react-bootstrap';
import { QuizContext } from '../context/QuizContext';
import Question from '../components/Question';
import Scoreboard from '../components/Scoreboard';
import ResultDisplay from '../components/ResultDisplay';
import QuizInfoModal from './QuizInfoModel';
import '../index.css';

function Quiz() {
    const { categoryId, quizData, quizRecord, questionIndex, startQuiz, isComplete, resetQuizContext } = useContext(QuizContext);
    const [showModal, setShowModal] = useState(false);   
    const toggleModal = () => setShowModal(!showModal);
     // Calculate progress value for ProgressBar
    const progress = quizData ? ((questionIndex + 1) / quizData.questionSet.length) * 100 : 0;


    //display loading spinner if no category ID or quiz data
    if (!categoryId || !quizData) {
        return ( <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>       
                )}
        
    if (isComplete) {
        return (
            <main className='container text-center' data-testid="results">
                <Container className="mb-3" style={{color:"#FFFFFF"}}><h1>You Scored: {quizRecord.calculateScore()}!</h1></Container>
                    <ResultDisplay results={quizRecord.calculateResults()} />               
                <Button variant='primary' onClick={startQuiz}>Play Again?</Button>
            </main>
        );
    }

    return (
        <Card className='text-center roboto-black' style={{ background: 'linear-gradient(to bottom, #03045e, #023e8a)'}} > 
            <Container fluid style={{borderRadius: '10px', border: '5px solid #fe7e13'}} >
                <Row>   
                    <Row className='mb-1 mt-1' style={{color:'white'}}> 
                            <Col>
                                <Row>
                                    <Col><h4 className='roboto-black-italic' data-testid='quiz-category-display'>{quizData.categoryName}</h4><hr /></Col>
                                </Row>
                                <Row>
                                    <Col></Col>
                                    <Col><Button variant="danger" size="lg" onClick={toggleModal} className="roboto-black-italic" style={{fontSize:"1rem"}} data-testid='info-modal-button'>i</Button></Col>
                                    <Col></Col>                                 
                                </Row>
                            </Col>
                            <Col>
                                <Row >
                                    <Scoreboard score={quizRecord.calculateScore()} style={{border: '1px solid #fe7e13'}} /> 
                                </Row>                                                            
                            </Col>
                            <Col></Col>
                    </Row>
                    <Row className='mb-1'>
                        <Col>
                            <ProgressBar animated now={progress} label={`${questionIndex + 1} / ${quizData.questionSet.length}`} data-testid='progress-bar' />
                        </Col>
                    </Row>
                    <Row>
                     <Question questionData={quizData.questionSet[questionIndex]}  />                      
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
