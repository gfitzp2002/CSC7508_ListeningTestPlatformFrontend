import React from 'react';
import { Container, Button, Row, Col, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import earSinging from '../images/earSinging.png';
import '../styles/myStyles.css';

function LandingPage() {
  return (
    <Container className='text-center'>
        <Row>
            <h1>Welcome to Aural Atlas!</h1>
        </Row>
        <Row className="justify-content-center mt-3">
            <Col xs={12} md={6}>
                <Image src={earSinging}  alt="A singing ear cartoon image" className='earSingingImage' />
            </Col>
        </Row>
        <Row className="justify-content-center mt-3">
             <Col xs={12} sm={6} md={4} lg={3} className="mb-2">
                <LinkContainer to="/login">
                    <Button variant='primary' className='w-100'>Login</Button>
                </LinkContainer>
            </Col>
            <Col xs={12} sm={6} md={4} lg={3}>
                <LinkContainer to="/signup">
                    <Button variant='primary' className='w-100'>Sign Up</Button>
                </LinkContainer>
            </Col>
        </Row>        
    </Container>
  );
}

export default LandingPage;
