import React from 'react';
import Quiz from './components/Quiz';
import Welcome from './components/Welcome';
import Login from './components/Login';
import SignUpForm from './components/SignUpForm';
import LandingPage from './components/LandingPage';
import { Routes, Route, useLocation } from 'react-router-dom';
import ProtectedRoute from './utils/ProtectedRoute';

const AppRoutes = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const categoryId = queryParams.get('categoryId');

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
            path="/quiz" 
            element={
              <ProtectedRoute redirectTo="/login">
                <Quiz categoryId={categoryId} />
              </ProtectedRoute>
            } 
          />
          {/* Add more routes as needed - add a 404 not found component */}
        </Routes>
      );
    };
  
  export default AppRoutes;