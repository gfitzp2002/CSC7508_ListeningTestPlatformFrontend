import React from 'react';
import Quiz from './Quiz';
import { Container, Image } from 'react-bootstrap';

function App() {
  return (
    <div className="App" style={{ backgroundColor: '#65afb4' }}>
      <header>
        <Container className="text-center">
          <Image src={process.env.PUBLIC_URL + '/AuralAtlasLogo1.png'} alt="Auditory Atlas Logo" fluid />
        </Container>
      </header>
      <main >
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          <Quiz categoryId={1}/> 
        </Container>
      </main> 
    </div>
  );
}

export default App;
