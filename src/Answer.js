import React, { useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import './Answer.css';

function Answer({ answers, correctAnswer, onSubmission }) {
  const [selectedAnswer, setSelectedAnswer] = useState('');

  const handleChange = (event) => {
    setSelectedAnswer(event.target.value);
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
            <Form.Check
              type='radio'
              id={answer.answerId}
              label={answer.answerText}
              value={answer.answerText}
              checked={selectedAnswer === answer.answerText}
              onChange={handleChange}
            />
          </Col>
        ))}
        </Row>
      </Form>
      <Button variant='danger' onClick={handleSubmit}>Submit</Button>
    </Container>
  );
}

export default Answer;
