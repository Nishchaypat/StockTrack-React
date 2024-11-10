import React, { useState } from 'react';
import { Link, useLocation, useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

const Sidebar = () => {
  const location = useLocation();
  const { isDark } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { auth, setAuth } = useContext(AuthContext); // Access auth context and setter
  const { userId } = useParams();
  const navigate = useNavigate(); // useNavigate hook to navigate programmatically

  const menuItems = [
    { path: `/dashboard/${userId}`, icon: 'fas fa-globe', label: 'Dashboard' },
    { path: `/watchlist/${userId}`, icon: 'fas fa-star', label: 'Watchlist' },
    { path: `/profile/${userId}`, icon: 'fas fa-user', label: 'Profile' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user_id');
    navigate('/login');
  };

  return (
    <>
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-green-500 text-white shadow-lg"
      >
        <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
      </button>

      {/* Sidebar Container */}
      <div
        className={`${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 fixed top-0 left-0 z-40 h-full w-64 ${
          isDark ? 'bg-gray-900' : 'bg-gray-100'
        } overflow-y-auto flex flex-col transition-transform duration-300 ease-in-out`}
      >
        {/* Animated background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 opacity-10">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute h-px bg-green-500"
                style={{
                  left: `${i * 25}%`,
                  top: `${50 + Math.sin(i) * 20}%`,
                  width: '25%',
                  transform: 'rotate(-15deg)',
                  animation: `pulse 3s infinite ${i * 0.5}s`,
                }}
              ></div>
            ))}
          </div>
        </div>

        <div className="flex-grow p-4">
          {/* Logo */}
          <div className="flex items-center justify-center mb-8 pt-4 relative">
            <div className="relative w-10 h-10 mr-2">
              <div className="absolute inset-0 bg-green-500 opacity-20 rounded-lg"></div>
              <i className="fas fa-chart-line text-green-500 text-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></i>
            </div>
            <span className={`${isDark ? 'text-white' : 'text-gray-900'} text-xl font-bold`}>StockTrack</span>
          </div>

          {/* Navigation */}
          <nav className="space-y-2 relative">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  location.pathname === item.path
                    ? 'bg-green-500 text-white'
                    : `${isDark ? 'text-gray-400 hover:bg-gray-800' : 'text-gray-600 hover:bg-gray-200'} hover:text-green-500`
                }`}
              >
                <i className={`${item.icon} w-6`}></i>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>

        {/* Logout Button */}
        {auth.token && (
          <div className="p-4 mt-auto">
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors shadow-md"
            >
              Logout
            </button>
          </div>
        )}

        {/* Support Card */}
        <div className="p-4 mt-auto">
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-4 text-center shadow-lg`}>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} text-sm mb-2`}>Need help?</p>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg w-full hover:bg-green-600 transition-colors shadow-md hover:shadow-lg">
              Contact Support
            </button>
          </div>
        </div>

        {/* CSS for animations */}
        <style jsx>{`
          @keyframes pulse {
            0% {
              opacity: 0.1;
              transform: translateY(0) rotate(-15deg);
            }
            50% {
              opacity: 0.3;
              transform: translateY(-10px) rotate(-15deg);
            }
            100% {
              opacity: 0.1;
              transform: translateY(0) rotate(-15deg);
            }
          }
        `}</style>
      </div>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
