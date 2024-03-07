import React, { useState } from 'react';
import { Container, Button, Row, Col, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import LoginOverlay from './LoginOverlay';
import logoImage from '../images/auralatlasLogo2.png'

function LandingPage() {
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <Container className='justify-content-center' style={{maxHeight: '100vh'}} fluid>
        <Row className="justify-content-center mt-5">
                <Image 
                  src={logoImage} 
                  alt="Aural Atlas logo" 
                  className='atlasMainLogo' 
                  onClick={handleOpenModal} 
                  style={{ cursor: 'pointer' }}
                  roundedCircle />
        </Row>
        <LoginOverlay showModal={showModal} handleClose={handleCloseModal}/>
    </Container>
  );
}

export default LandingPage;
