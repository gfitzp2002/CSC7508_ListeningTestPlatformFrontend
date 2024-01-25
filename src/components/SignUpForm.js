import React, { useContext, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import UserModel from '../models/UserModel';
import SignUpService from '../service/SignUpService';
import { useNavigate } from 'react-router-dom';
import { MessageContext } from '../context/MessageContext';

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
      <h1>Create Account</h1>
      <Form onSubmit={handleSubmit} className='d-flex flex-column align-items-center'>
        <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
                type="text"
                placeholder="Enter username"
                value={userData.username}
                onChange={handleUsernameChange}
            />
        </Form.Group>
        <Form.Group controlId="formUserForename">
          <Form.Label>Forename:</Form.Label>
          <Form.Control
              type="text"
              placeholder="Enter forename"
              value={userData.userForename}
              onChange={handleUserForenameChange}
          />

        </Form.Group>
        <Form.Group controlId="formUserSurname">
            <Form.Label>Surname:</Form.Label>
            <Form.Control
                type="text"
                placeholder="Enter surname"
                value={userData.userSurname}
                onChange={handleUserSurnameChange}
            />
        </Form.Group>
        <Form.Group controlId="formUserEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
                type="email"
                placeholder="Enter email"
                value={userData.userEmail}
                onChange={handleUserEmailChange}
            />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
              type="password"
              placeholder="Enter password"
              value={userData.password}
              onChange={handlePasswordChange}
          />
        </Form.Group>
        <Form.Group controlId="formConfirmPassword">
          <Form.Label>Confirm Password:</Form.Label>
          <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
          />
        </Form.Group>
        <Button className='mt-4' variant='primary' type="submit">Sign Up</Button>
      </Form>
    </Container>
  );
};

export default SignUpForm;
