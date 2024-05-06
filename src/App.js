import React, { useState } from 'react';
import NavBar from './components/NavBar';
import { Container, Row, Col } from 'react-bootstrap';
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
          <Container className="App">
            <Row className="text-center">
                <header>                 
                  {isLoggedIn && <NavBar />}
                </header>
            </Row>
            <Row >
                <main>
                  <Container className="d-flex align-items-center">
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
