import React, { useState, useContext } from 'react';
import LoginService from '../service/LoginService';
import LoginModel from '../models/LoginModel';
import { useAuth } from '../context/AuthContext';
import { MessageContext } from '../context/MessageContext';
import { Button, Container, Form, FloatingLabel, Image } from 'react-bootstrap';
import logoImage from '../images/auralatlasLogo2small.png';
import { Formik } from 'formik';
import * as Yup from 'yup';

function Login() {
  const { login } = useAuth();
  const { showToast } = useContext(MessageContext);

  //validation schema
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Please enter a username.'),
    password: Yup.string().required('Please enter a password.'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    
    try {
      const { token, expiry, username } = await LoginService.login(values);
      console.log('Login successful! Token:', token); 
      login(token, expiry, username);
     
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login error 
      showToast('You log in details are not found, please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className='d-flex flex-column align-items-center mt-2'>
      <Image src={logoImage} alt="Aural Atlas logo image" roundedCircle className='mb-5'/>
      <Formik
        initialValues={{ 
          username: '', 
          password: '' 
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
      <Form onSubmit={handleSubmit}  className="d-flex flex-column align-items-center" style={{ borderRadius: '10px',border: '1px solid white', padding: '20px' }}>
        <Form.Group controlId="formUsername">
          <FloatingLabel 
            label="Username" 
            className="mt-3 mb-3"
            isInvalid={touched.username && !!errors.username}
          >
            <Form.Control
                type="text"
                placeholder="Enter username"
                name="username"
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.username && !!errors.username}
            />
            <Form.Control.Feedback type="invalid">{errors.username}</Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        <Form.Group controlId="formPassword">
          <FloatingLabel
                label="Password"
                className="mt-3 mb-3"
                isInvalid={touched.password && !!errors.password}
            >
            <Form.Control
                type="password"
                placeholder="Enter password"
                name="password"
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.password && !!errors.password}
            />
          </FloatingLabel>
          <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
        </Form.Group>
        <Button className='mt-4' variant='secondary' size='lg' type="submit" disabled={isSubmitting}>Login</Button>
      </Form>
      )}
      </Formik>
    </Container>
  );
};

export default Login;
