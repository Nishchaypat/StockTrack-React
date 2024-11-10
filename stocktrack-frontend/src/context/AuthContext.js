import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem('authToken'), // Use 'authToken' here
    userId: localStorage.getItem('userId'),
  });

  const login = (token, userId) => {
    setAuth({ token, userId });
    localStorage.setItem('authToken', token); // Store as 'authToken'
    localStorage.setItem('userId', userId);
  };

  const logout = () => {
    setAuth({ token: null, userId: null });
    localStorage.removeItem('authToken'); // Remove 'authToken'
    localStorage.removeItem('userId');
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
