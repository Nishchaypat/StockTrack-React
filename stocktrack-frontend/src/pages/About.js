// src/pages/About.js
import React from 'react';
import Navbar from '../components/Navbar';
import { useTheme } from '../context/ThemeContext';

const About = () => {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <Navbar />
      
      {/* Hero Section with Animated Background */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-blue-500/20"></div>
          {/* Animated Lines */}
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
                  animation: `pulse${i} 3s infinite ${i * 0.5}s`
                }}
              />
            ))}
          </div>
        </div>

        <div className="relative pt-32 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className={`text-4xl md:text-5xl font-extrabold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>
                About <span className="text-green-500">StockTrack</span>
              </h1>
              <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-600'} max-w-3xl mx-auto`}>
                A comprehensive stock tracking and analysis platform built as a DBMS class project. 
                We blend advanced machine learning with real-time stock data and news sentiment for insightful financial predictions.
              </p>
            </div>
          </div>
        </div>
      </div>
      <br />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Project Overview */}
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-8 shadow-lg hover:shadow-green-500/10 transition-all duration-300`}>
            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>Project Overview</h2>
            <div className="space-y-4 text-gray-300">
              <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                StockTrack is designed to provide comprehensive financial information, 
                news, and stock price data for various companies. Our platform integrates 
                advanced machine learning with robust database management to deliver 
                accurate predictions and real-time insights.
              </p>
              <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                What sets us apart is our XGBoost prediction model achieving 93% accuracy 
                in stock price predictions, combined with sentiment analysis from major 
                financial news sources.
              </p>
            </div>
          </div>

          {/* Technical Stack */}
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-8 shadow-lg hover:shadow-green-500/10 transition-all duration-300`}>
            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>Technical Stack</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-green-500 mb-2">Machine Learning</h3>
                <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                  Implemented using XGBoost for stock price prediction, with feature 
                  engineering and real-time data processing capabilities.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-500 mb-2">Database Architecture</h3>
                <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                  Built on advanced DBMS principles with efficient query optimization 
                  and real-time data synchronization. The system supports robust stock 
                  data tracking and analysis.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-500 mb-2">Front-End Technology</h3>
                <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                  Developed with React for a dynamic user interface, ensuring responsiveness 
                  and interactive experiences for users across all devices.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Features Section */}
        <div className={`mt-12 ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-8 shadow-lg hover:shadow-green-500/10 transition-all duration-300`}>
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>Key Functionalities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-green-500 mb-4">Basic Functions</h3>
              <ul className={`space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {[ 
                  'User management and profile customization', 
                  'Real-time stock price tracking', 
                  'Company financial metrics analysis', 
                  'Advanced search and filtering capabilities',
                  'Portfolio management'
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <i className="fas fa-check text-green-500 mr-2"></i>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-green-500 mb-4">Advanced Features</h3>
              <ul className={`space-y-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {[ 
                  'AI-powered price predictions',
                  'News sentiment analysis',
                  'Personalized investment insights',
                  'Real-time market updates',
                  'Automated risk assessment'
                ].map((item, index) => (
                  <li key={index} className="flex items-center">
                    <i className="fas fa-star text-green-500 mr-2"></i>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Project Goals */}
        <div className={`mt-12 ${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-8 shadow-lg hover:shadow-green-500/10 transition-all duration-300`}>
          <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>Project Goals</h2>
          <div className={`space-y-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            <p>
              This project was developed as part of a DBMS class assignment, aiming to 
              demonstrate practical application of database management principles while 
              creating a useful tool for investors and financial analysts.
            </p>
            <p>
              The integration of machine learning and sentiment analysis showcases how 
              modern technologies can be combined with traditional database systems to 
              create powerful, user-friendly applications. The goal is to enhance financial 
              decision-making processes by providing actionable insights.
            </p>
          </div>
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes pulse0 { 0% { opacity: 0.1; transform: translateY(0) rotate(-15deg); }
                           50% { opacity: 0.3; transform: translateY(-10px) rotate(-15deg); }
                           100% { opacity: 0.1; transform: translateY(0) rotate(-15deg); } }
        @keyframes pulse1 { 0% { opacity: 0.1; transform: translateY(0) rotate(-15deg); }
                           50% { opacity: 0.4; transform: translateY(20px) rotate(-15deg); }
                           100% { opacity: 0.1; transform: translateY(0) rotate(-15deg); } }
        @keyframes pulse2 { 0% { opacity: 0.1; transform: translateY(0) rotate(-15deg); }
                           50% { opacity: 0.4; transform: translateY(-15px) rotate(-15deg); }
                           100% { opacity: 0.1; transform: translateY(0) rotate(-15deg); } }
        @keyframes pulse3 { 0% { opacity: 0.1; transform: translateY(0) rotate(-15deg); }
                           50% { opacity: 0.5; transform: translateY(10px) rotate(-15deg); }
                           100% { opacity: 0.1; transform: translateY(0) rotate(-15deg); } }
        @keyframes pulse4 { 0% { opacity: 0.1; transform: translateY(0) rotate(-15deg); }
                           50% { opacity: 0.5; transform: translateY(-5px) rotate(-15deg); }
                           100% { opacity: 0.1; transform: translateY(0) rotate(-15deg); } }
      `}</style>
    </div>
  );
};

export default About;
