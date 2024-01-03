import React, { useState } from 'react';
import Quiz from './Quiz';
import { Container, Image } from 'react-bootstrap';
import Login from './Login';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setLoggedIn(true);
    console.log("User is now logged in!");
  }

  return (
    <Container className="App" style={{ backgroundColor: '#65afb4' }}>
      <header>
        <Container className="text-center">
          <Image src={process.env.PUBLIC_URL + '/logo.png'} alt="Auditory Atlas Logo" fluid />
        </Container>
      </header>
      <main >
      <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
          {isLoggedIn ? (
            <Quiz categoryId={2} />
          ) : (
            <Login onLoginSuccess={handleLoginSuccess} />
          )}
        </Container>
      </main> 
    </Container>
  );
}

export default App;
