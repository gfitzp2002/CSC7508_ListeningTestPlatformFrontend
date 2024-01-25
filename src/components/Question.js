import React, { useContext, useEffect, useState} from 'react';
import { Container, Card, Col, Row, Alert } from 'react-bootstrap';
import AudioPlayer from '../components/AudioPlayer';
import { getAudioDescription } from '../service/AudioService';
import Answer from '../components/Answer';
import '../styles/myStyles.css';
import { QuizContext } from '../context/QuizContext';

function Question({questionData, onSubmission}) { 
    const[currentAudio, setCurrentAudio] = useState({ audioFilename: null, audioPlayer: null });
    const [alert, setAlert] = useState({ show: false, message: '', variant: '' });
    const{ updateIsCorrect} = useContext(QuizContext); 

    useEffect(() => {
        // Reset isCorrect when the component mounts
        updateIsCorrect(null); 
        
    }, []);

    
    useEffect(() => {
        if (alert.show) {
            // auto-hide alert after 2 seconds if it is currently showing
            const timer = setTimeout(() => setAlert({ ...alert, show: false }), 2000); 
            // Clear timeout if component unmounts
            return () => clearTimeout(timer); 
        }
    }, [alert]);

    //inside a useEffect?..
    const handleSubmission = result => {
        updateIsCorrect(result);
        
        // Display alert message for feedback
        const feedbackMessage = result ? `Correct! Well done!!` : `Oops! Wrong answer. The correct answer was ${questionData.correctAnswer.answerText}`;
        setAlert({ show: true, message: feedbackMessage, variant: result ? 'success' : 'danger' });
        if(onSubmission) {
            onSubmission(result);
        }
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
        return <h2>Loading......</h2>
    }
    console.log(questionData);
     

    //concatentate the file name with the file type to create complete file name
    const referenceAudioFile = questionData.referenceAudioFilename + questionData.referenceAudioFiletype; 
    const questionAudioFile = questionData.questionAudioFilename + questionData.questionAudioFiletype; 

    //get audio clip descriptions
    const referenceDescription = getAudioDescription(questionData, true);
    const questionDescription = getAudioDescription(questionData, false);

    return (
        <Container className='text-center mb-3'>
            <Row>
                <Col>
                    {alert.show && (
                        <Alert variant={alert.variant} onClose={() => setAlert({ ...alert, show: false })} >
                    {alert.message}
                </Alert>
            )}
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card className='mb-4'>
                        <Card.Header>
                            <h4>This is {referenceDescription}</h4>
                        </Card.Header>
                        <Card.Body >
                            <div id='audio-buttons' className='mt-3'>
                                <AudioPlayer 
                                    audioFilename={referenceAudioFile}
                                    isPlaying={currentAudio.audioFilename === referenceAudioFile && currentAudio.audioPlayer === 'reference'}
                                    togglePlay={() => togglePlay(referenceAudioFile, 'reference')}
                                 /> 
                            </div>  
                    </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card className='mb-4'>
                        <Card.Header>
                            <h4>Here is {questionDescription}...</h4>
                        </Card.Header>
                        <Card.Body >
                            <div id='audio-buttons' className='mt-3'>
                            <AudioPlayer 
                                    audioFilename={questionAudioFile}
                                    isPlaying={currentAudio.audioFilename === questionAudioFile && currentAudio.audioPlayer === 'question'}
                                    togglePlay={() => togglePlay(questionAudioFile, 'question')}
                                 />  
                            </div>   
                        </Card.Body>
                    </Card> 
                </Col> 
            </Row>
            <Row>
                <Col>
                    <Card>
                        <Card.Body>
                            <Answer answers={questionData.answers} correctAnswer={questionData.correctAnswer} onSubmission={handleSubmission} />
                        </Card.Body> 
                    </Card>
                    
                </Col>
            </Row>
        </Container>
    );
    }

export default Question;


