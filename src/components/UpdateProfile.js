import React, { useState, useEffect } from 'react';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import UserProfileUpdateModel from '../models/UserProfileUpdateModel';
import { updateUserProfile } from '../service/UserService';
import { Formik } from 'formik';
import * as Yup from 'yup';

const UpdateProfile = ({ userProfile, onClose }) => {
  
  const validationSchema = Yup.object().shape({
    userForename: Yup.string().required('Required'),
    userSurname: Yup.string().required('Required'),
    userEmail: Yup.string().email('Invalid email address').required('Required'),
    twitter: Yup.string().nullable(),
    instagram: Yup.string().nullable(),
    facebook: Yup.string().nullable()
  });

  const userProfileToUpdatedProfile = (userProfile) => {
    const { personalInfo, socialMedia } = userProfile;
    return {
      userForename: personalInfo.userForename,
      userSurname: personalInfo.userSurname,
      userEmail: personalInfo.userEmail,
      twitter: socialMedia.twitter,
      instagram: socialMedia.instagram,
      facebook: socialMedia.facebook
    };
  };

  const handleSubmit = async (values, { setSubmitting }) => {    
    console.log("Handle Submit called");
    try {
      const userProfileUpdate = new UserProfileUpdateModel(
        values.userForename,
        values.userSurname,
        values.userEmail,
        values.twitter,
        values.instagram,
        values.facebook
      );
      await updateUserProfile(userProfile.personalInfo.username, userProfileUpdate); 
      console.log("UpdateUserProfile called.  userProfileUpdate = " + userProfile)
      onClose();
    } catch (error) {
      console.error('Error updating user profile:', error);
     
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={userProfileToUpdatedProfile(userProfile)}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
    {({ values, errors, touched, handleChange, handleSubmit, handleBlur, isSubmitting }) => (
    <Form onSubmit={handleSubmit} className='d-flex flex-column' style={{ borderRadius: '10px',border: '1px solid white', padding: '20px' }}>
      <Form.Group controlId="userForename">
        <FloatingLabel 
            label="Forename" 
            className="mt-3 mb-3"
            validationState={touched.userForename && errors.userForename ? 'error' : null}
          >
            <Form.Control 
              type="text" 
              placeholder="Enter first name" 
              name="userForename" 
              value={values.userForename}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.userForename && !!errors.userForename}
            />
            <Form.Control.Feedback type="invalid">{errors.userForename}</Form.Control.Feedback>
        </FloatingLabel>
      </Form.Group>
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
                value={values.userSurname}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.userSurname && !!errors.userSurname}
            />
            <Form.Control.Feedback type="invalid">{errors.userSurname}</Form.Control.Feedback>
          </FloatingLabel>
      </Form.Group>
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
                value={values.userEmail}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.userEmail && !!errors.userEmail}
            />
            <Form.Control.Feedback type="invalid">{errors.userEmail}</Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        <Form.Group controlId="formTwitter">
          <FloatingLabel 
            label="Twitter" 
            className="mt-3 mb-3"
            validationState={touched.twitter && errors.twitter ? 'error' : null}
          >
            <Form.Control
                type="text"
                placeholder="Enter Twitter handle"
                name= "twitter"
                value={values.twitter}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.twitter && !!errors.twitter}
            />
            <Form.Control.Feedback type="invalid">{errors.twitter}</Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        <Form.Group controlId="formInstagram">
          <FloatingLabel 
            label="Instagram" 
            className="mt-3 mb-3"
            validationState={touched.instagram && errors.instagram ? 'error' : null}
          >
            <Form.Control
                type="text"
                placeholder="Enter instagram username"
                name= "instagram"
                value={values.instagram}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.instagram && !!errors.instagram}
            />
            <Form.Control.Feedback type="invalid">{errors.instagram}</Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group>
        <Form.Group controlId="formFacebook">
          <FloatingLabel 
            label="Facebook" 
            className="mt-3 mb-3"
            validationState={touched.facebook && errors.facebook ? 'error' : null}
          >
            <Form.Control
                type="text"
                placeholder="Enter Facebook username"
                name= "facebook"
                value={values.facebook}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.facebook && !!errors.facebook}
            />
            <Form.Control.Feedback type="invalid">{errors.facebook}</Form.Control.Feedback>
          </FloatingLabel>
        </Form.Group> 

          <Button variant="primary" type="submit">Update</Button>     
    </Form>
       )}
    </Formik>
  );
};

export default UpdateProfile;
