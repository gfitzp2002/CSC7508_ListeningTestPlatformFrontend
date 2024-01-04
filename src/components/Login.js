import React, { useState } from 'react';
import LoginService from '../service/LoginService';
import LoginModel from '../models/LoginModel';
import { Button, Container, Form } from 'react-bootstrap';

function Login({onLoginSuccess}) {
const [loginData, setLoginData] = useState(new LoginModel('', ''));

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

    try {
      const token = await LoginService.login(loginData);
      console.log('Login successful! Token:', token);  
      onLoginSuccess();
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login error 
    }
  };

  return (
    <Container className='d-flex flex-column align-items-center'>
      <h1>Login</h1>
      <Form onSubmit={handleLogin}>
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
