import React from 'react';
import Quiz from './components/Quiz';
import Welcome from './components/Welcome';
import Login from './components/Login';
import QuizMenu from './components/QuizMenu';
import SignUpForm from './components/SignUpForm';
import LandingPage from './components/LandingPage';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './utils/ProtectedRoute';
import UserLoginHistory from './components/UserLoginHistory';
import AdminPanel from './components/AdminPanel';
import LoginStatsByMonth from './components/LoginStatsByMonth';
import Leaderboard from './components/LeaderBoard';

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
            path="/quiz-menu" 
            element={
              <ProtectedRoute redirectTo="/login">
                <QuizMenu />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/user-login-history" 
            element={
              <ProtectedRoute redirectTo="/login">
                <UserLoginHistory />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/login-stats" 
            element={
              <ProtectedRoute redirectTo="/login">
                <LoginStatsByMonth />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin-panel" 
            element={
              <ProtectedRoute redirectTo="/login">
                <AdminPanel />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/top-scores" 
            element={
              <ProtectedRoute redirectTo="/login">
                <Leaderboard />
              </ProtectedRoute>
            } 
          />
          {/* add a 404 not found component */}
        </Routes>
      );
    };
  
  export default AppRoutes;