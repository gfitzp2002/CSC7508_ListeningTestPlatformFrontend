import React, { useState, useContext } from 'react';
import LoginService from '../service/LoginService';
import LoginModel from '../models/LoginModel';
import { useAuth } from '../context/AuthContext';
import { MessageContext } from '../context/MessageContext';
import { Button, Container, Form } from 'react-bootstrap';

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
      const { token, expiry } = await LoginService.login(loginData);
      console.log('Login successful! Token:', token); 
      login(token, expiry);
     
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login error 
      showToast('You log in details are not found, please try again.');
    }
  };

  return (
    <Container className='d-flex flex-column align-items-center' >
      <h1>Login</h1>
      <Form onSubmit={handleLogin}  className="d-flex flex-column align-items-center">
        <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
                type="text"
                placeholder="Enter username"
                value={loginData.username}
                onChange={handleUsernameChange}
            />
            </Form.Group>
            <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
                type="password"
                placeholder="Enter password"
                value={loginData.password}
                onChange={handlePasswordChange}
            />
            </Form.Group>
        <Button className='mt-4' variant='primary' type="submit">Login</Button>
      </Form>
    </Container>
  );
};

export default Login;
