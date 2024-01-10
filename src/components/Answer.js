import React, { useState, useContext } from 'react';
import { QuizContext } from '../context/QuizContext';
import { MessageContext } from '../context/MessageContext';
import EarAnimation from './EarAnimation';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import '../styles/Answer.css';

function Answer({ answers, correctAnswer, onSubmission }) {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showAnimation, setShowAnimation] = useState(null);
  const{ updateIsCorrect } = useContext(QuizContext);
  const { showToast } = useContext(MessageContext); 
  
  function handleAnimation(isCorrect) {
    // Show the correct animation depending on isCorrect value
    setShowAnimation(isCorrect);
  
    // Hide the animation after a specified time period
    setTimeout(() => setShowAnimation(null), 2000);
  }
  
  const handleChange = (input) => {
    const answerText = typeof input === 'string' ? input : input.target.value;
    setSelectedAnswer(answerText);
  };

  const handleSubmit = () => {
    // Check if the selected answer is not empty
    if (!selectedAnswer) {
      // Display a message to tell user they must choose an answer 
      showToast('Please select an answer');
      return;
    }
    
    // Check if the selected answer is correct and call the callback function
    const isCorrectAnswer = selectedAnswer === correctAnswer.answerText;
    //show animation
    handleAnimation(isCorrectAnswer);
    //update context value and pass onSubmission prop to Question 
    updateIsCorrect(isCorrectAnswer);
    onSubmission(isCorrectAnswer);
    //reset selectedAnswer value
    setSelectedAnswer('');
  };

  return (
    
    <Container>
      
      <h3>Possible Answers:</h3>
      <Form>
        <Row>
        {answers.map((answer) => (
          <Col key={answer.answerId} md={6}>
            <div 
            className='radio-highlight'
            onClick={() => handleChange(answer.answerText)}
            >
            <Form.Check              
              type='radio'
              id={answer.answerId}
              label={answer.answerText}
              value={answer.answerText}
              checked={selectedAnswer === answer.answerText}
              onChange={handleChange}
            />
            </div>
          </Col>
        ))}
        </Row>
      </Form>
      <Button variant='primary' onClick={handleSubmit}>Submit</Button>
      {showAnimation !== null && <EarAnimation isCorrect={showAnimation} />}
    </Container>
  );
}

export default Answer;
