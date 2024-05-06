import React from 'react';
import { Container, Badge } from 'react-bootstrap';

function Scoreboard ({score}) {
    
    const scoreboardStyle = {
        border: '2px solid black',
        borderRadius: '8px',
      };
    

    return (
      <Container className='text-center' data-testid='scoreboard'>
        <h2>Score</h2>
        <Container>
        <h1 style={{ fontSize: '4rem' }}><Badge bg="light" text="dark" style={scoreboardStyle}>{score}</Badge></h1>
        </Container>
      </Container>
      );
}

export default Scoreboard;