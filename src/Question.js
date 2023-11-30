import React, { useState } from 'react';
import AudioPlayer from './AudioPlayer';
import Answer from './Answer';
import './Answer.css';

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
    //ensure the files have loaded before rendering
    if (!questionData) {
        return <h2>Loading......</h2>
    }

    //concatentate the file name with the file type 
    const referenceAudioFile = questionData.referenceAudioFilename + questionData.referenceAudioFiletype; 
    console.log("referenceAudioFile: " + referenceAudioFile);
    const questionAudioFile = questionData.questionAudioFilename + questionData.questionAudioFiletype; 
    console.log("questionAudioFile: " + questionAudioFile);
    return (
        <div className='container text-center'>
            <div className="card-header">
                <h4>Press the reference audio button to hear a recording of a {questionData.referenceAudioFilename} sine wave</h4>
            </div>
            <div className='card mt-3 p-3' style={{ backgroundColor: '#C8D3D5'}}>
                <div className='card-body' id='audio-buttons'>
                    <div className='mt-3'>
                     <AudioPlayer audioFilename={referenceAudioFile} /> 
                    </div>  
                </div> 
            </div>
            <div className="card-header">
                <h4>The question audio button is a recording of a sine wave at a specific frequency.....</h4>
            </div>
            <div className='card mt-3 p-3' style={{ backgroundColor: '#C8D3D5'}}>
                <div className='card-body' id='audio-buttons'>
                    <div className='mt-3'>
                     <AudioPlayer audioFilename={questionAudioFile} /> 
                    </div>  
                </div> 
            </div>
            <div className='card mt-3 p-3' style={{ backgroundColor: '#C8D3D5'}}>
                <Answer answers={questionData.answers} correctAnswer={questionData.correctAnswer} onSubmission={handleSubmission} />
                {/*Print on screen whether the correct answer has been submitted */}
                {isCorrect !== null && (
            <div>
                <p>Your answer is {isCorrect ? 'correct' : 'incorrect'}.</p>
            </div>
            )}
            </div>   
        </div>
    );
    }

export default Question;


