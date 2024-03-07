import React, { useState, useContext } from 'react';
import { QuizContext } from '../context/QuizContext';
import { MessageContext } from '../context/MessageContext';
import EarAnimation from './EarAnimation';
import { Card, Form, Button, Row, Col, ListGroup } from 'react-bootstrap';
import '../styles/myStyles.css';
import '../index.css';

function Answer({ answers, correctAnswer, onSubmission, sourceName }) {
  const [showAnimation, setShowAnimation] = useState(null);
  const{ categoryId } = useContext(QuizContext);
 
  
  function handleAnimation(isCorrect) {
    // Show the correct animation depending on isCorrect value
    setShowAnimation(isCorrect);  
    // Hide the animation after a specified time period
    setTimeout(() => setShowAnimation(null), 1000);
  }
  
  const handleSubmit = (selectedAnswer) => {
    // Check if the selected answer is not empty
    if (!selectedAnswer) {
      // Display a message to tell user they must choose an answer 
      alert('Please select an answer');
      return;
    }
    
    // Check if the selected answer is correct and call the callback function
    const isCorrectAnswer = selectedAnswer === correctAnswer.answerText;
    //show animation
    handleAnimation(isCorrectAnswer);

    onSubmission(selectedAnswer);

  };

  const getAnswerInstruction = (categoryId, sourceName) => {
    if (categoryId === 1 || categoryId === 2) {
      return "Name that frequency!";
    } else if (categoryId === 3 && sourceName === "mix sources 8dB changes") {
      return "Identify the sound source to which the level difference has been applied";
    } else if (categoryId === 3) {
      return "Can you identify the dB change?";
    } else {
      return "Default answer text";
    }
  }



  return (
    
    <Card className='roboto-black'>
      <Card.Header>      
        <h4>{getAnswerInstruction(categoryId, sourceName)}</h4>
      </Card.Header>
      <Card.Body>
        <Row>

            <ListGroup className="list-group-flush" >
                {answers.map((answer) => (
                    <ListGroup.Item
                        variant="light" 
                        key={answer.answerId} 
                        action 
                        onClick={() => handleSubmit(answer.answerText)}
                        as="button"
                    >
                      <span style={{ fontWeight: 'bold', fontSize: '1.2em' }}>{answer.answerText}</span>
                    </ListGroup.Item>
                ))}
            </ListGroup>

        </Row>
      </Card.Body>
        {showAnimation !== null && <EarAnimation isCorrect={showAnimation} />}
    </Card>
  );
}

export default Answer;
