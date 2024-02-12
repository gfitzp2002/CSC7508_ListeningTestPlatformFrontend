import React, { useState, useContext } from 'react';
import LoginService from '../service/LoginService';
import LoginModel from '../models/LoginModel';
import { useAuth } from '../context/AuthContext';
import { MessageContext } from '../context/MessageContext';
import { Button, Container, Form, FloatingLabel } from 'react-bootstrap';

function Login() {
  const [loginData, setLoginData] = useState(new LoginModel('', ''));
  const { login } = useAuth();
  const { showToast } = useContext(MessageContext);

  const handleUsernameChange = (e) => {
      setLoginData((prevLoginData) => ({
      ...prevLoginData,
      username: e.target.value,
      }));
  };

  const handlePasswordChange = (e) => {
      setLoginData((prevLoginData) => ({
      ...prevLoginData,
      password: e.target.value,
      }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Check for blank fields
    if (!loginData.username) {
      showToast('Please enter a username.');
      return;
    } else if (!loginData.password) {
      showToast('Please enter a password.');
      return;
    }
    try {
      const { token, expiry, username } = await LoginService.login(loginData);
      console.log('Login successful! Token:', token); 
      login(token, expiry, username);
     
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login error 
      showToast('You log in details are not found, please try again.');
    }
  };

  return (
    <Container className='d-flex flex-column align-items-center mt-2' >
      <h1 className='mt-2'>Login</h1>
      <Form onSubmit={handleLogin}  className="d-flex flex-column align-items-center">
        <Form.Group controlId="formUsername">
          <FloatingLabel
              label="Username"
              className="mt-3 mb-3"
          >
            <Form.Control
                type="text"
                placeholder="Enter username"
                value={loginData.username}
                onChange={handleUsernameChange}
            />
          </FloatingLabel>
        </Form.Group>
        <Form.Group controlId="formPassword">
          <FloatingLabel
                label="Password"
                className="mt-3 mb-3"
            >
            <Form.Control
                type="password"
                placeholder="Enter password"
                value={loginData.password}
                onChange={handlePasswordChange}
            />
          </FloatingLabel>
        </Form.Group>
        <Button className='mt-4' variant='primary' size='lg' type="submit">Login</Button>
      </Form>
    </Container>
  );
};

export default Login;
