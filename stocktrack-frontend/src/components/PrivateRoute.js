import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // Retrieve the token and user_id from localStorage
  const authToken = localStorage.getItem('authToken');
  const userId = localStorage.getItem('user_id');
  
  // Check if both token and user ID are present
  return authToken && userId ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
