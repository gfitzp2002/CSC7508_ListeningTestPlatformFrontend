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
import LeadersBoard from './components/LeadersBoard';
import InactiveUsers from './components/InactiveUsers';
import ProfilePage from './components/ProfilePage';
import TopScorers from './components/TopScorers';

const AppRoutes = () => {

    return (
        <Routes>
          <Route 
            path="/" 
            element={
            <ProtectedRoute redirectTo="/home" inverse={true}>
                <LandingPage />
            </ProtectedRoute>
            } 
          />          
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
              <ProtectedRoute redirectTo="/home" inverse={true}>
                <SignUpForm />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/home" 
            element={
              <ProtectedRoute redirectTo="/">
                <Welcome />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile-page/:username" 
            element={
              <ProtectedRoute redirectTo="/">
                 <ProfilePage />
              </ProtectedRoute>
            } 
          /> 
          <Route 
            path="/quiz/:categoryId" 
            element={
              <ProtectedRoute redirectTo="/">
                <Quiz />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/quiz-menu" 
            element={
              <ProtectedRoute redirectTo="/">
                <QuizMenu />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/user-login-history" 
            element={
              <ProtectedRoute redirectTo="/">
                <UserLoginHistory />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/login-stats" 
            element={
              <ProtectedRoute redirectTo="/">
                <LoginStatsByMonth />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/inactive-users" 
            element={
              <ProtectedRoute redirectTo="/">
                <InactiveUsers />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/admin-panel" 
            element={
              <ProtectedRoute redirectTo="/">
                <AdminPanel />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/top-scores" 
            element={
              <ProtectedRoute redirectTo="/">
                <TopScorers />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/leader-board" 
            element={
              <ProtectedRoute redirectTo="/">
                <LeadersBoard />
              </ProtectedRoute>
            } 
          />
          {/* add a 404 not found component */}
        </Routes>
      );
    };
  
  export default AppRoutes;