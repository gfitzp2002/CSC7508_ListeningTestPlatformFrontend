import React, { useState } from 'react';
import { Container, Card } from 'react-bootstrap';
import AudioPlayer from './AudioPlayer';
import Answer from './Answer';
import './styles/Answer.css';

function Question({questionData, onSubmission}) { 
   const[isCorrect, setIsCorrect] = useState(null); 

   //inside a useEffect?..
    const handleSubmission = result => {
        setIsCorrect(result);
        //implement scoring 
        if(onSubmission) {
            onSubmission(result);
        }
    }
    //ensure the files have loaded before rendering otherwise display...
    if (!questionData) {
        return <h2>Loading......</h2>
    }

    //concatentate the file name with the file type 
    const referenceAudioFile = questionData.referenceAudioFilename + questionData.referenceAudioFiletype; 

    const questionAudioFile = questionData.questionAudioFilename + questionData.questionAudioFiletype; 

    return (
        <Container className='text-center'>
        
            <Card className='mb-4'>
                <Card.Header>
                    <h4>Press the reference audio button to hear a recording of a {questionData.referenceAudioFilename} sine wave</h4>
                </Card.Header>
                <Card.Body >
                    <div id='audio-buttons' className='mt-3'>
                        <AudioPlayer audioFilename={referenceAudioFile} /> 
                    </div>  
               </Card.Body>
            </Card>

            <Card className='mb-4'>
                <Card.Header>
                    <h4>The question audio button is a recording of a sine wave at a specific frequency.....</h4>
                </Card.Header>
                <Card.Body >
                    <div id='audio-buttons' className='mt-3'>
                        <AudioPlayer audioFilename={questionAudioFile} /> 
                    </div>   
                </Card.Body>
            </Card>  

            <Card>
                <Card.Body>
                    <Answer answers={questionData.answers} correctAnswer={questionData.correctAnswer} onSubmission={handleSubmission} />
                    {/*Print on screen whether the correct answer has been submitted */}
                    {isCorrect !== null && (
                <div>
                    <p>Your answer is {isCorrect ? 'correct' : 'incorrect'}.</p>
                </div>
                )}
                </Card.Body> 
            </Card>

        </Container>
    );
    }

export default Question;


