import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';

//simple welcome screen - needs to be personalised next iteration
function Welcome() {
  return (
    <Container className='text-center'>
        <Row>
            <Col>
                <h2>Welcome to the Quiz App!</h2>
            </Col>
        </Row>
        <Row>
            <Col>
                <p>Select a quiz category from the menu above to start..</p>
            </Col>
        </Row>
    </Container>
  );
}

export default Welcome;
