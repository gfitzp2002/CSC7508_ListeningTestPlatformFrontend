import React, { useState } from 'react';
import { Modal, CloseButton, Tab, Tabs } from 'react-bootstrap';
import SignUpForm from './SignUpForm';
import Login from './Login';

function LoginOverlay({ showModal, handleClose }) {
  const [showSignUp, setShowSignUp] = useState(false);

  const toggleForm = () => {
    setShowSignUp(!showSignUp);
  };

  return (
    <>

      <Modal show={showModal} onHide={handleClose} style={{borderRadius:"10px"}}>
        <Modal.Header style={{ backgroundColor: '#03045e', border:'none'}}>
            <CloseButton aria-label="Hide" variant='white' onClick={handleClose}/>
        </Modal.Header>
        <Modal.Body style={{ backgroundColor: '#03045e'}}>            
            <Tabs
                defaultActiveKey="login"
                className="mb-3"
                justify
            >
              <Tab eventKey="login" title="Sign In">
                  <Login />
              </Tab>
              <Tab eventKey="signUpForm" title="Sign Up">
                  <SignUpForm />
              </Tab>
            </Tabs>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default LoginOverlay;
