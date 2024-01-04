import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import '../styles/Answer.css';

function Answer({ answers, correctAnswer, onSubmission }) {
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const handleChange = (input) => {
    const answerText = typeof input === 'string' ? input : input.target.value;
    setSelectedAnswer(answerText);
  };

  const handleSubmit = () => {
    // Check if the selected answer is correct and call the callback function
    const isCorrect = selectedAnswer === correctAnswer.answerText;
    onSubmission(isCorrect);
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
      <Button variant='danger' onClick={handleSubmit}>Submit</Button>
    </Container>
  );
}

export default Answer;
