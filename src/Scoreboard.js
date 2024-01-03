import React from 'react';
import { Container } from 'react-bootstrap';

function Scoreboard ({score}) {
    
    const scoreboardStyle = {
        backgroundColor: 'white',
        color: 'black',
        padding: '10px',
        border: '2px solid black',
        borderRadius: '8px',
        textAlign: 'center',
        width: '150px', // Adjust width as needed
        margin: '10px auto', // Center the scoreboard
      };
    
      const numberStyle = {
        fontSize: '24px', 
        fontWeight: 'bold',
      };

    return (
        <Container style={scoreboardStyle}>
            <h2 style={numberStyle}>{score}</h2>
        </Container>
      );
}

export default Scoreboard;