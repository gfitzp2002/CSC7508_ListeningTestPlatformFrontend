import React, { useState } from 'react';
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
    <div>
      <h3>Possible Answers:</h3>
      <ul id='answers'>
        {answers.map((answer) => (
          <li key={answer.answerId}>
            <label>
              <input
                type="radio"
                value={answer.answerText}
                checked={selectedAnswer === answer.answerText}
                onChange={handleChange}
              />
              <h5>{answer.answerText}</h5>
            </label>
          </li>
        ))}
      </ul>
      <button className='usebtn btn-primary' onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Answer;
