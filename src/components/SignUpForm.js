import React, { useContext, useState } from 'react';
import { Button, Container, Form, Row, Image, FloatingLabel, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserModel from '../models/UserModel';
import SignUpService from '../service/SignUpService';
import { useNavigate } from 'react-router-dom';
import { MessageContext } from '../context/MessageContext';
import logoImage from '../images/auralatlasLogo2small.png'

function SignUpForm() {
  const [userData, setUserData] = useState(new UserModel('', '', '', '', ''));
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate()
  const { showToast } = useContext(MessageContext);

  const handleUsernameChange = (e) => {
      setUserData((prevUserData) => ({
      ...prevUserData,
      username: e.target.value,
      }));
  };
  const handleUserForenameChange = (e) => {
    setUserData((prevUserData) => ({ 
      ...prevUserData, 
      userForename: e.target.value 
    }));
  };

  const handleUserSurnameChange = (e) => {
      setUserData((prevUserData) => ({ 
        ...prevUserData, 
        userSurname: e.target.value 
      }));
  };

  const handleUserEmailChange = (e) => {
      setUserData((prevUserData) => ({ 
        ...prevUserData, 
        userEmail: e.target.value 
      }));
  };

  const handlePasswordChange = (e) => {
      setUserData((prevUserData) => ({
      ...prevUserData,
      password: e.target.value,
      }));
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      // Check for blank fields
      if (!userData.username) {
        showToast('Please enter a username.');
        return;
      } else if (!userData.userForename) {
        showToast('Please enter your forename');
        return;
      } else if (!userData.userSurname) {
        showToast('Please enter your surname');
        return;
      }else if (!userData.userEmail) {
        showToast('Please enter your email address');
        return;
      } else if (!userData.password) {
        showToast('Please enter a password.');
        return;
      } else if (!confirmPassword) {
        showToast('Please confirm your password.');
        return;
      }
      //check passwords match
    if (userData.password !== confirmPassword) {
      console.error('Passwords do not match');
      showToast('Your passwords do not match!');
      return; 
    }

    try {
      const response = await SignUpService.signUp(userData);
      console.log('Account successfully created', response);
      //handle redirect 
      showToast('Your account has been successfully created, please log in.');
      navigate('/login'); 
    } catch (error) {
      console.error('Sign up failed:', error);
      // Check if the error status is 409 - Duplicate username
      if (error.response && error.response.status === 409) {
        showToast('Username already exists. Please try a different username.');
      } else {
        showToast('There has been an error creating your account, please check your details and try again.');
      }
    }
  };

  return (
    <Container  className="d-flex flex-column align-items-center">
      <Row>
        <Link to="/">
          <Image src={logoImage} alt="Aural Atlas logo image" roundedCircle className='mb-5'/>
        </Link>
      </Row>
      <Row>
      <Form onSubmit={handleSubmit} className='d-flex flex-column' style={{ borderRadius: '10px',border: '1px solid white', padding: '20px' }}>
        <Form.Group controlId="formUsername">
            <FloatingLabel label="Username" className="mt-3 mb-3">
              <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={userData.username}
                  onChange={handleUsernameChange}
              />
            </FloatingLabel>
        </Form.Group>

        <Row>
          <Col>
        <Form.Group controlId="formUserForename">
          <FloatingLabel label="Forename" className="mt-3 mb-3">
            <Form.Control
                type="text"
                placeholder="Enter forename"
                value={userData.userForename}
                onChange={handleUserForenameChange}
            />
          </FloatingLabel>
        </Form.Group>
        </Col>
        <Col>
        <Form.Group controlId="formUserSurname">
          <FloatingLabel label="Surname" className="mt-3 mb-3">
            <Form.Control
                type="text"
                placeholder="Enter surname"
                value={userData.userSurname}
                onChange={handleUserSurnameChange}
            />
          </FloatingLabel>
        </Form.Group>
        </Col>
        </Row>
        <Form.Group controlId="formUserEmail">
          <FloatingLabel label="Email" className="mt-3 mb-3">
            <Form.Control
                type="email"
                placeholder="Enter email"
                value={userData.userEmail}
                onChange={handleUserEmailChange}
            />
          </FloatingLabel>
        </Form.Group>
        <Row>
          <Col>
        <Form.Group controlId="formPassword">
          <FloatingLabel label="Password" className="mt-3 mb-3">
            <Form.Control
                type="password"
                placeholder="Enter password"
                value={userData.password}
                onChange={handlePasswordChange}
            />
          </FloatingLabel>
        </Form.Group>
        </Col>
        <Col>
        <Form.Group controlId="formConfirmPassword">
          <FloatingLabel label="Confirm Password" className="mt-3 mb-3">
            <Form.Control
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
            />
          </FloatingLabel>
        </Form.Group>
        </Col>
        </Row>
        <Button className='mt-4' variant='secondary' type="submit">Sign Up</Button>
      </Form>
      </Row>
    </Container>
  );
};

export default SignUpForm;
