import React from 'react';
import Quiz from './components/Quiz';
import Welcome from './components/Welcome';
import Login from './components/Login';
import SignUpForm from './components/SignUpForm';
import LandingPage from './components/LandingPage';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './utils/ProtectedRoute';
import LoginHistory from './components/LoginHistory';

const AppRoutes = () => {

    return (
        <Routes>
          <Route path="/" element={<LandingPage />} />        
          <Route 
            path="/login" 
            element={
              <ProtectedRoute redirectTo="/home" inverse={true}>
                <Login />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/signup" 
            element={
              <ProtectedRoute redirectTo="/" inverse={true}>
                <SignUpForm />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/home" 
            element={
              <ProtectedRoute redirectTo="/login">
                <Welcome />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/quiz/:categoryId" 
            element={
              <ProtectedRoute redirectTo="/login">
                <Quiz />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/login-history" 
            element={
              <ProtectedRoute redirectTo="/login">
                <LoginHistory />
              </ProtectedRoute>
            } 
          />
          {/* add a 404 not found component */}
        </Routes>
      );
    };
  
  export default AppRoutes;