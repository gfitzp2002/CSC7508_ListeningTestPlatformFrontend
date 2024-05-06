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
    <Container className='d-flex justify-content-center align-items-center' style={{minHeight: '100vh'}} >
        <Row className="justify-content-center text-center mt-5">
                <Image 
                  src={logoImage} 
                  alt="Aural Atlas logo" 
                  className='atlasMainLogo img-fluid' 
                  onClick={handleOpenModal} 
                  style={{ cursor: 'pointer' }}
                   />
                  <h4 className="roboto-regular" style={{color:"white"}}>Click to enter</h4>
        </Row>
        <LoginOverlay showModal={showModal} handleClose={handleCloseModal}/>
    </Container>
  );
}

export default LandingPage;
