import React, { createContext, useState, useContext, useEffect } from 'react';
import { startTokenRefreshTimer, stopTokenRefreshTimer } from '../utils/TokenUtils';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
      token: localStorage.getItem('userToken'),
      expiry: localStorage.getItem('tokenExpiry') ? new Date(parseInt(localStorage.getItem('tokenExpiry'), 10)) : null,
      isLoggedIn: false,
      intervalId: null
    });
  
    useEffect(() => {
      const token = localStorage.getItem('userToken');
      const expiryString = localStorage.getItem('tokenExpiry');
      
      // Convert expiryString to a Date object
      const expiry = expiryString ? new Date(parseInt(expiryString, 10)) : null;
      const isTokenValid = token && expiry && new Date() < expiry;
  
      console.log("Auth Provider, expiry:"+ expiry);
      console.log("Auth Provider, Is token valid:"+ isTokenValid);
      
      if (isTokenValid) {
          setAuthState(prevState => ({
              ...prevState,
              token,
              expiry,
              isLoggedIn: true,
              intervalId: startTokenRefreshTimer(logout)
          }));
      } else {
        logout();
      }
      // Cleanup function
      return () => {
        logout();
      };
    }, []);
  
    const login = (token, expiry) => {
      localStorage.setItem('userToken', token);
      localStorage.setItem('tokenExpiry', expiry);
      const intervalId = startTokenRefreshTimer(logout);
      setAuthState({ token, expiry, isLoggedIn: true, intervalId });
    };
  
    const logout = () => {
      localStorage.removeItem('userToken');
      localStorage.removeItem('tokenExpiry');
      if (authState.intervalId) {
        stopTokenRefreshTimer(authState.intervalId);
      }
      setAuthState({ token: null, expiry: null, isLoggedIn: false, intervalId: null });
    };

  return (
    <AuthContext.Provider value={{ ...authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
