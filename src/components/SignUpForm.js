import React, { useContext, useState } from 'react';
import { Button, Container, Form, Row, Image, FloatingLabel, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserModel from '../models/UserModel';
import SignUpService from '../service/SignUpService';
import { useNavigate } from 'react-router-dom';
import { MessageContext } from '../context/MessageContext';
import logoImage from '../images/auralatlasLogo2small.png';
import { Formik } from 'formik';
import * as Yup from 'yup';

function SignUpForm() {
  const navigate = useNavigate()
  const { showToast } = useContext(MessageContext);

  // validation schema using Yup
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Please enter a username.'),
    userForename: Yup.string().required('Please enter your forename.'),
    userSurname: Yup.string().required('Please enter your surname.'),
    userEmail: Yup.string().email('Please enter a valid email address.').required('Please enter your email address.'),
    password: Yup.string().required('Please enter a password.'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match.').required('Please confirm your password.'),
  });
  


  const handleSubmit = async (values, { setSubmitting }) => {

    try {
      const response = await SignUpService.signUp(values);
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
    } finally {
      setSubmitting(false);
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
      <Formik
        initialValues={{
          username: '',
          userForename: '',
          userSurname: '',
          userEmail: '',
          password: '',
          confirmPassword: ''
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
      <Form onSubmit={handleSubmit} className='d-flex flex-column' style={{ borderRadius: '10px',border: '1px solid white', padding: '20px' }}>
        <Form.Group controlId="formUsername">
            <FloatingLabel 
              label="Username" 
              className="mt-3 mb-3"
              validationState={touched.username && errors.username ? 'error' : null}
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

        <Row>
          <Col>
        <Form.Group controlId="formUserForename">
          <FloatingLabel 
            label="Forename" 
            className="mt-3 mb-3"
            validationState={touched.userForename && errors.userForename ? 'error' : null}
          >
            <Form.Control
                type="text"
                placeholder="Enter forename"
                name= "userForename"
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.userForename && !!errors.userForename}
            />
            <Form.Control.Feedback type="invalid">{errors.userForename}</Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        </Col>
        <Col>
        <Form.Group controlId="formUserSurname">
          <FloatingLabel 
            label="Surname" 
            className="mt-3 mb-3"
            validationState={touched.userSurname && errors.userSurname ? 'error' : null}
          >
            <Form.Control
                type="text"
                placeholder="Enter surname"
                name= "userSurname"
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.userSurname && !!errors.userSurname}
            />
            <Form.Control.Feedback type="invalid">{errors.userSurname}</Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        </Col>
        </Row>
        <Form.Group controlId="formUserEmail">
          <FloatingLabel 
            label="Email" 
            className="mt-3 mb-3"
            validationState={touched.userEmail && errors.userEmail ? 'error' : null}
          >
            <Form.Control
                type="email"
                placeholder="Enter email"
                name= "userEmail"
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.userEmail && !!errors.userEmail}
            />
            <Form.Control.Feedback type="invalid">{errors.userEmail}</Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        <Row>
          <Col>
          <Form.Group controlId="formPassword">
            <FloatingLabel 
              label="Password"
              className="mt-3 mb-3"
              validationState={touched.password && errors.password ? 'error' : null}
            >
              <Form.Control
                  type="password"
                  placeholder="Enter password"
                  name= "password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isInvalid={touched.password && !!errors.password}
              />
              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
        </Col>
        <Col>
        <Form.Group controlId="formConfirmPassword">
          <FloatingLabel 
            label="Confirm Password" 
            className="mt-3 mb-3"
            validationState={touched.confirmPassword && errors.confirmPassword ? 'error' : null}
          >
            <Form.Control
                type="password"
                placeholder="Confirm password"
                name= "confirmPassword"
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.confirmPassword && !!errors.confirmPassword}
            />
            <Form.Control.Feedback type="invalid">{errors.confirmPassword}</Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        </Col>
        </Row>
        <Button className='mt-4' variant='secondary' type="submit">Sign Up</Button>
      </Form>
      )}
      </Formik>
      </Row>
    </Container>
  );
};

export default SignUpForm;
