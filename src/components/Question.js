import React, { useContext, useEffect, useState} from 'react';
import { Container, Card, Col, Row, Alert } from 'react-bootstrap';
import AudioPlayer from '../components/AudioPlayer';
import Answer from '../components/Answer';
import '../styles/myStyles.css';
import '../index.css';
import { QuizContext } from '../context/QuizContext';
import QuestionResponse from '../models/QuestionResponse';

function Question({questionData}) { 
    const[currentAudio, setCurrentAudio] = useState({ audioFilename: null, audioPlayer: null });
    const [alert, setAlert] = useState({ show: false, message: '', variant: '' });
    const{ updateQuizRecord} = useContext(QuizContext); 
  
    
    useEffect(() => {
        if (alert.show) {
            // auto-hide alert after 2 seconds if it is currently showing
            const timer = setTimeout(() => setAlert({ ...alert, show: false }), 2000); 
            // Clear timeout if component unmounts
            return () => clearTimeout(timer); 
        }
    }, [alert]);

  
    const handleSubmission = (submittedAnswer) => {
        const questionResponse = new QuestionResponse(
            questionData.correctAnswer.sourceId,
            questionData.correctAnswer.answerText, 
            submittedAnswer
        )
        updateQuizRecord(questionResponse);
        const isCorrect = questionResponse.isCorrect();
        
        // Display alert message for feedback
        const feedbackMessage = isCorrect ? `Correct! Well done!!` : `Oops! Wrong answer. The correct answer was ${questionData.correctAnswer.answerText}`;
        setAlert({ show: true, message: feedbackMessage, variant: isCorrect ? 'success' : 'danger' });

    }

    //check if current audioplayer and audiofile are playing and toggle playing state
    const togglePlay = (audioFilename, audioPlayer) => {
        if(currentAudio.audioFilename === audioFilename && currentAudio.audioPlayer === audioPlayer) {
            setCurrentAudio({audioFilename: null, audioPlayer: null});
        }else {
            setCurrentAudio({audioFilename, audioPlayer});
        }
        
    }

    //ensure the files have loaded before rendering otherwise display...
    if (!questionData) {
        console.log("Loading statement in Question entered");
        return <h2>Loading......</h2>
    }
    console.log(questionData);
     

    //concatentate the file name with the file type to create complete file name
    const referenceAudioFile = questionData.referenceAudioFilename + questionData.referenceAudioFiletype; 
    const questionAudioFile = questionData.questionAudioFilename + questionData.questionAudioFiletype; 

    return (
        <Container className='text-center roboto-black' data-testid='question-component'>
            <Row>
                <Col>
                    {alert.show && (
                        <Alert variant={alert.variant} onClose={() => setAlert({ ...alert, show: false })} style={{fontSize:'1.5em'}} >
                            {alert.message}
                        </Alert>
                    )}
                </Col>
            </Row>

            <Row>
                <Col lg='3' className='d-flex flex-column'>                 
                    <Card className="mb-1 flex-grow-1" style={{border: '3px solid #fe7e13'}}>
                        <Card.Body  className='d-flex flex-column justify-content-lg-end'>
                            <Card.Text >Source: {questionData.soundSource}</Card.Text>
                                <hr />
                                {questionData.referenceText !== "No Change" ? (
                                <>
                                    <Card.Text >{questionData.referenceText}</Card.Text>
                                    <hr />
                                </>
                                ) : null}
                            
                            <AudioPlayer 
                                audioFilename={referenceAudioFile}
                                isPlaying={currentAudio.audioFilename === referenceAudioFile && currentAudio.audioPlayer === 'reference'}
                                togglePlay={() => togglePlay(referenceAudioFile, 'reference')}
                                data-testid='reference-audio-player'
                            /> 
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg='9' className='d-flex flex-column'>
                    <Card className="mb-1 flex-grow-1" style={{border: '3px solid #fe7e13'}}>
                           <Card.Body className='d-flex flex-column justify-content-lg-end' >
                            <Row>
                                <h5 className='roboto-black'>Play this....</h5>
                                <hr />
                                <h5 className='roboto-black'>... then answer the question below</h5>
   
                            </Row>
                            <Row>
                                <AudioPlayer 
                                        audioFilename={questionAudioFile}
                                        isPlaying={currentAudio.audioFilename === questionAudioFile && currentAudio.audioPlayer === 'question'}
                                        togglePlay={() => togglePlay(questionAudioFile, 'question')}
                                        data-testid='question-audio-player'
                                /> 
                            </Row>
                        </Card.Body>
                    </Card>              
                </Col>
            </Row>

            <Row className='mb-2' data-testid='answers'>
                <Col>
                    <Answer answers={questionData.answers} correctAnswer={questionData.correctAnswer} onSubmission={handleSubmission} sourceName={questionData.soundSource} data-testid='answer-component' />
                </Col>      
            </Row>
        </Container>
    );
    }

export default Question;


