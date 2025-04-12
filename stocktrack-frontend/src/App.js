import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Watchlist from './pages/Watchlist';
import Profile from './pages/Profile';
import Home from './pages/Home';
import Features from './pages/Features';
import About from './pages/About';
import Navbar from './components/Navbar';
import { ThemeProvider } from './context/ThemeContext';
import CompanyPage from './pages/CompanyPage';
import AboutDatabasePage from './pages/AboutDatabasePage';
import AboutMLPage from './pages/AboutMLPage';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/features" element={<Features />} />
            <Route path="/about" element={<About />} />
            <Route path="/dbinfo" element={<AboutDatabasePage />} />
            <Route path="/mlinfo" element={<AboutMLPage />} />
            <Route path="/company/:ticker" element={<CompanyPage />} />
            <Route element={<Layout />}>
              <Route 
                path="/dashboard/:userId"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                } 
              />
              { <Route 
                path="/watchlist/:userId" 
                element={
                  <PrivateRoute>
                    <Watchlist />
                  </PrivateRoute>
                } 
              />}
              <Route 
                path="/profile/:userId" 
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                } 
              />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
