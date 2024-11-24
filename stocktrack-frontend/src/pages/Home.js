import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useTheme } from '../context/ThemeContext';

const Home = () => {
  const { isDark } = useTheme();

  const themeClasses = {
    bg: isDark ? 'bg-gray-900' : 'bg-gray-100',
    text: isDark ? 'text-white' : 'text-gray-900',
    secondaryText: isDark ? 'text-gray-300' : 'text-gray-600',
    cardBg: isDark ? 'bg-gray-800' : 'bg-white',
    highlight: 'text-green-500',
    accent: isDark ? 'from-green-500/20 to-blue-500/20' : 'from-green-500/10 to-blue-500/10'
  };

  return (
    <div className={`min-h-screen ${themeClasses.bg} transition-colors duration-200`}>
      <Navbar />

      {/* Hero Section with Stock Market Animation */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className={`absolute inset-0 bg-gradient-to-r ${themeClasses.accent}`}></div>
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
                  animation: `pulse 2s infinite ${i * 0.5}s`
                }}
              ></div>
            ))}
          </div>
        </div>

        <div className="relative pt-32 pb-20 sm:pt-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex justify-center items-center mb-6 space-x-2">
                <i className="fas fa-chart-line text-green-500 text-5xl"></i>
                <h1 className={`text-4xl sm:text-6xl font-bold ${themeClasses.text}`}>
                  Trade <span className="text-green-500">Smarter</span>
                </h1>
              </div>
              <p className={`text-xl ${themeClasses.secondaryText} mb-8 max-w-2xl mx-auto`}>
                Advanced stock tracking with AI-powered predictions and real-time market insights.
              </p>
              <div className="flex justify-center space-x-4">
                <Link
                  to="/register"
                  className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition-all transform hover:scale-105 shadow-lg hover:shadow-green-500/20"
                >
                  Start Trading
                </Link>
                <a
                  href="/features"
                  className={`border border-green-500/20 ${themeClasses.text} px-8 py-3 rounded-lg hover:bg-green-500/10 transition-all`}
                >
                  Explore Features
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className={`py-20 ${isDark ? 'bg-gray-800/50' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold ${themeClasses.text} text-center mb-12`}>
            Professional Trading Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[ 
              {
                icon: 'fas fa-robot',
                title: 'AI-Powered Predictions',
                description: 'Leverage AI algorithms like XGBoost for 93% accurate stock predictions. Make data-driven investment decisions.',
                color: 'green'
              },
              {
                icon: 'fas fa-chart-line',
                title: 'Advanced Technical Analysis',
                description: 'Use detailed candlestick charting and real-time data to analyze stock movements and trends.',
                color: 'green'
              },
              {
                icon: 'fas fa-newspaper',
                title: 'Market News with Sentiment Scoring',
                description: 'Get real-time news with sentiment analysis to gauge market sentiment and influence your trading strategy.',
                color: 'green'
              }
            ].map((feature, index) => (
              <div
                key={index}
                className={`${themeClasses.cardBg} rounded-xl p-6 backdrop-blur-lg transform transition-all hover:scale-105 shadow-lg hover:shadow-green-500/10`}
              >
                <div className={`bg-${feature.color}-500/20 w-14 h-14 rounded-lg flex items-center justify-center mb-4`}>
                  <i className={`${feature.icon} text-${feature.color}-500 text-2xl`}></i>
                </div>
                <h3 className={`text-xl font-semibold ${themeClasses.text} mb-2`}>{feature.title}</h3>
                <p className={themeClasses.secondaryText}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <i className="fas fa-chart-line text-blue-500 text-2xl mr-2"></i>
                <span className="text-white text-xl font-bold">StockTrack</span>
              </div>
              <p className="text-gray-400">
                Making stock tracking and portfolio management easier for everyone.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="/features" className="text-gray-400 hover:text-white">Features</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="/about" className="text-gray-400 hover:text-white">About</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="https://www.linkedin.com/in/nishchay-pat/" className="text-gray-400 hover:text-white">
                  <i className="fab fa-linkedin"></i>
                </a>
                <a href="https://github.com/Nishchaypat" className="text-gray-400 hover:text-white">
                  <i className="fab fa-github"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>© 2024 StockTrack. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
