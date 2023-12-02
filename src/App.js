import React from 'react';
import Quiz from './Quiz';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <header>
        <Container className="text-center">
          <h1>Auditory Atlas</h1>
        </Container>
      </header>

      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh', backgroundColor: '#FCFAFA' }}>
        <Quiz categoryId={1}/> 
      </Container>
      
    </div>
  );
}

export default App;
