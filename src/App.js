import React, { useState } from 'react';
import NavBar from './components/NavBar';
import { Container, Image, Row, Col } from 'react-bootstrap';
import { MessageProvider } from './context/MessageContext';
import { useAuth } from './context/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { QuizProvider } from './context/QuizContext';



function App() {
  const {isLoggedIn} = useAuth();

  return (
    
    <BrowserRouter>
      <MessageProvider>
        <QuizProvider>
          <Container className="App"  fluid>
            <Row className="text-center">
                <header>
                  <Image src={process.env.PUBLIC_URL + '/logo.png'} alt="Auditory Atlas Logo" />
                  {isLoggedIn && <NavBar />}
                </header>
            </Row>
            <Row>
                <main>
                  <Container className="d-flex align-items-center mb-3">
                    <AppRoutes />
                  </Container>
                </main>
            </Row>
          </Container>
        </QuizProvider>
      </MessageProvider>
    </BrowserRouter>
    
  );
}

export default App;
