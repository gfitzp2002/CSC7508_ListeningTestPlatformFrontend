import React, { useState } from 'react';
import Quiz from './components/Quiz';
import NavBar from './components/NavBar';
import Welcome from './components/Welcome';
import { Container, Image, Row, Col } from 'react-bootstrap';
import Login from './components/Login';
import { MessageProvider } from './context/MessageContext';
import { useAuth } from './context/AuthContext';

function App() {
  const {isLoggedIn} = useAuth();
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
 
  const handleCategorySelect = (categoryId) => {
    setSelectedCategoryId(categoryId);
  };

  const renderContent = () => {
    if (!isLoggedIn) {
      return <Login  />;
    } else if (selectedCategoryId) {
      return <Quiz categoryId={selectedCategoryId} />;
    } else {
      return <Welcome />;
    }
  };

  return (
    
    <MessageProvider>
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
    </MessageProvider>
    
  );
}

export default App;
