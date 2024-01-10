import React from 'react';
import { Container, Badge } from 'react-bootstrap';

function Scoreboard ({score}) {
    
    const scoreboardStyle = {
        border: '2px solid black',
        borderRadius: '8px',
      };
    

    return (
      <Container className='text-center'>
        <h2>Score</h2>
        <Container>
        <h1><Badge bg="light" text="dark" style={scoreboardStyle}>{score}</Badge></h1>
        </Container>
      </Container>
      );
}

export default Scoreboard;