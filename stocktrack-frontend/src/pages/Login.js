import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useTheme } from '../context/ThemeContext'; // Import the ThemeContext

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isDark } = useTheme(); // Access the theme context
  const handleLogin = async () => {
    setLoading(true);
    setLoginError('');
    try {
      const response = await axios.post((window.location.origin.includes('localhost') ? 'http://localhost:8000/api/login/' : 'https://stocktrack-react.onrender.com/api/login/'),
      { email, password });
      if (response.data.token && response.data.token !== "") {
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('user_id', response.data.user_id);
        console.log(response);
        console.log('Navigating to /dashboard/' + response.data.user_id);
        navigate(`/dashboard/${response.data.user_id}`);
      }
    } catch (error) {
      setLoginError('Login failed: Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const pulseKeyframes = `
    @keyframes pulse {
      0% { opacity: 0.1; transform: translateY(0) rotate(-15deg); }
      50% { opacity: 0.3; transform: translateY(-10px) rotate(-15deg); }
      100% { opacity: 0.1; transform: translateY(0) rotate(-15deg); }
    }
    .pulse-animation {
      animation: pulse .02s ease-in-out infinite;
    }
  `;

  return (
    <>
      <style>{pulseKeyframes}</style>
      <Navbar />
      <div className={`relative min-h-screen ${isDark ? 'bg-gray-900' : 'bg-white'} flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8`}>
        <div className="absolute inset-0 overflow-hidden">
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

        <div className="relative max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="flex items-center justify-center">
              <i className="fas fa-chart-line text-green-500 text-4xl"></i>
            </div>
            <h2 className={`mt-6 text-3xl font-bold ${isDark ? 'text-white' : 'text-black'}`}>Welcome back</h2>
            <p className={`mt-2 text-sm ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>
              Don't have an account?{' '}
              <a href="/register" className="text-green-500 hover:text-green-400">Sign up</a>
            </p>
          </div>

          <div className={`bg-gray-800/50 backdrop-blur-lg rounded-xl p-8 ${isDark ? 'bg-gray-800' : 'bg-gray-200'}`}>
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
              <div>
                <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>Email address</label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-900'}`}>Password</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="••••••••"
                />
              </div>

              {loginError && (
                <div className="text-red-500 text-sm">
                  <p>{loginError}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-offset-green focus:ring-offset-green ring-offset-green transition-colors duration-[300ms]"
              >
                {loading ? 'Logging in...' : 'Sign in'}
              </button>
            </form>
          </div>
        </div>

        <style jsx>{`
          @keyframes pulse {
            0% { opacity: 0.1; transform: translateY(0) rotate(-15deg); }
            50% { opacity: 0.3; transform: translateY(-10px) rotate(-15deg); }
            100% { opacity: 0.1; transform: translateY(0) rotate(-15deg); }
          }
        `}</style>
      </div>
    </>
  );
}

export default Login;
