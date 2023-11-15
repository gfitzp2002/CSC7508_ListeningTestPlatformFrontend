import React, { useState, useEffect } from 'react';
import { getQuestion } from './QuestionRoutes';
import AudioPlayer from './AudioPlayer';

function Question(props) { 
    const [questionData, setQuestionData] = useState('');
    console.log("QuestionID - " + props.questionId);   
    useEffect(() => {
        const fetchQuestionData = async () => {
        const data = await getQuestion(props.questionId);
            if (data) {
                setQuestionData(data);
            }
        };

        fetchQuestionData();
    }, [props.questionId]);


    return (
        <div className='container text-center'>
            <div className='card mt-3 p-3' style={{ backgroundColor: 'blue'}}>
                <div className='card-body'>
                    <div className='mt-3'>
                     <AudioPlayer referenceAudioFilename={questionData.referenceAudioFilename} questionAudioFilename={questionData.questionAudioFilename} /> 
                    </div>  
                </div> 
            </div>
        </div>
    );
    }

export default Question;


