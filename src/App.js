import React, { useState } from 'react';
import Quiz from './components/Quiz';
import NavBar from './components/NavBar';
import Welcome from './components/Welcome';
import { Container, Image, Row, Col } from 'react-bootstrap';
import Login from './components/Login';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  const handleLoginSuccess = () => {
    setLoggedIn(true);
    console.log("User is now logged in!");
  }

  const handleCategorySelect = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  const renderContent = () => {
    if (!isLoggedIn) {
      return <Login onLoginSuccess={handleLoginSuccess} />;
    } else if (selectedCategoryId) {
      return <Quiz categoryId={selectedCategoryId} />;
    } else {
      return <Welcome />;
    }
  };

  return (
    <Container className="App" fluid>
      <Row className="text-center">
        <Col>
          <header>            
              <Image src={process.env.PUBLIC_URL + '/logo.png'} alt="Auditory Atlas Logo" />   
              {isLoggedIn && <NavBar onCategorySelect={handleCategorySelect} />}
          </header>
        </Col>
      </Row>
      <Row>
        <Col>
          <main >
            <Container className="d-flex align-items-center mb-3">
                {renderContent()}
              </Container>
          </main>
        </Col>
      </Row> 
    </Container>
  );
}

export default App;
