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
    console.log(questionData);
    
    //helper function to conditionally render question text
    const getAudioDescription = (questionData, isReference) => {
        let description;
        switch (questionData.soundSource) {
            case 'sine wave':
                description = isReference ? `a ${questionData.referencePitch} sine wave` : `a sine wave at a specific frequency`;
                break;
            case 'piano':
                description = isReference ? `a recording of a piano note with a fundamental frequency of ${questionData.referencePitch}` : `a recording of a piano note with a specific fundamental frequency`;
                break;
            case 'harp':
                description = isReference ? `a recording of a harp note with a fundamental frequency of ${questionData.referencePitch}` : `a recording of a harp note with a specific fundamental frequency`;
                break;
            case 'marimba':
                description = isReference ? `a recording of a marimba note with a fundamental frequency of ${questionData.referencePitch}` : `a recording of a marimba note with a specific fundamental frequency`;
                break;
            case 'guitar':
                description = isReference ? `a recording of a guitar note with a fundamental frequency of ${questionData.referencePitch}` : `a recording of a guitar note with a specific fundamental frequency`;
                break;
            case 'pink noise':
                description = isReference ? `a one-octave band of pink noise with a centre frequency of ${questionData.referencePitch}` : `a one-octave band of pink noise with a specific centre frequency`;
                break;
            case 'pink noise 3rd octave':
                description = isReference ? `a 1/3 octave band of pink noise with a centre frequency of ${questionData.referencePitch}` : `a 1/3 octave band of pink noise with a specific centre frequency`;
                break;
            default:
                description = 'an audio recording';
                break;
        }
        return description;
    };
    

    //concatentate the file name with the file type to create complete file name
    const referenceAudioFile = questionData.referenceAudioFilename + questionData.referenceAudioFiletype; 
    const questionAudioFile = questionData.questionAudioFilename + questionData.questionAudioFiletype; 

    //get audio clip descriptions
    const referenceDescription = getAudioDescription(questionData, true);
    const questionDescription = getAudioDescription(questionData, false);

    return (
        <Container className='text-center'>
        
            <Card className='mb-4'>
                <Card.Header>
                    <h4>The following reference audio file is {referenceDescription}</h4>
                </Card.Header>
                <Card.Body >
                    <div id='audio-buttons' className='mt-3'>
                        <AudioPlayer audioFilename={referenceAudioFile} /> 
                    </div>  
               </Card.Body>
            </Card>

            <Card className='mb-4'>
                <Card.Header>
                    <h4>The following question audio file is {questionDescription}...</h4>
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


