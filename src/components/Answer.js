import React, { useState, useContext } from 'react';
import { QuizContext } from '../context/QuizContext';
import { MessageContext } from '../context/MessageContext';
import EarAnimation from './EarAnimation';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import '../styles/myStyles.css';

function Answer({ answers, correctAnswer, onSubmission }) {
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showAnimation, setShowAnimation] = useState(null);
  const{ updateQuizRecord } = useContext(QuizContext);
 
  
  function handleAnimation(isCorrect) {
    // Show the correct animation depending on isCorrect value
    setShowAnimation(isCorrect);
  
    // Hide the animation after a specified time period
    setTimeout(() => setShowAnimation(null), 1000);
  }
  
  const handleChange = (input) => {
    const answerText = typeof input === 'string' ? input : input.target.value;
    setSelectedAnswer(answerText);
  };

  const handleSubmit = () => {
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
    //reset selectedAnswer value
    setSelectedAnswer('');
  };

  return (
    
    <Card className='mb-4'>
      <Card.Header>      
        <h4>Possible Answers:</h4>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col md={2}>
          </Col>
          <Col md={8}>
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
                    label={<span style={{ fontWeight: 'bold' }}>{answer.answerText}</span>}
                    value={answer.answerText}
                    checked={selectedAnswer === answer.answerText}
                    onChange={handleChange}
                  />
                  </div>
                </Col>
              ))}
              </Row>
            </Form>
          </Col>
          <Col md={2}>      
          </Col>
        </Row>
      </Card.Body>
      <Card.Footer>
      <Button variant='primary' size="lg" onClick={handleSubmit}>Submit</Button>
      {showAnimation !== null && <EarAnimation isCorrect={showAnimation} />}
      </Card.Footer>
    </Card>
  );
}

export default Answer;
