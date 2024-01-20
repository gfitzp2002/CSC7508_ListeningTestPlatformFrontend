import React, { createContext, useState, useContext, useEffect } from 'react';
import { startTokenRefreshTimer, stopTokenRefreshTimer } from '../utils/TokenUtils';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
      token: localStorage.getItem('userToken'),
      expiry: new Date(localStorage.getItem('tokenExpiry')),
      isLoggedIn: false,
      intervalId: null
    });
  
    useEffect(() => {
      const isTokenExpired = new Date() >= new Date(authState.expiry);
      if (authState.token && !isTokenExpired) {
        setAuthState({ ...authState, isLoggedIn: true });
      }
    }, [authState.token, authState.expiry]);
  
    const login = (token, expiry) => {
      localStorage.setItem('userToken', token);
      localStorage.setItem('tokenExpiry', expiry);
      const intervalId = startTokenRefreshTimer();
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
