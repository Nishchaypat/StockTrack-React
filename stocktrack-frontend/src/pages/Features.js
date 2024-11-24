// src/pages/Features.js
import React from 'react';
import Navbar from '../components/Navbar';
import { useTheme } from '../context/ThemeContext';

const Features = () => {
  const { isDark } = useTheme();

  const features = [
    {
      icon: 'fa-chart-line',
      title: 'AI-Powered Price Prediction',
      description: 'Utilizing advanced XGBoost model trained on stock price data with 93% accuracy for precise predictions, helping users make data-driven investment decisions. The model incorporates key financial indicators, technical analysis features, and market trends.',
    },
    {
      icon: 'fa-newspaper',
      title: 'Sentiment Analysis',
      description: 'Real-time sentiment analysis of financial news, including sources like Bloomberg, CNBC, and Wall Street Journal. Leveraging natural language processing to track market sentiment and provide actionable insights for investment decisions.',
    },
    {
      icon: 'fa-database',
      title: 'Robust Database Management',
      description: 'Leveraging AWS RDS for efficient data storage and management, with real-time updates to stock prices, financial metrics, and news articles. The system ensures high availability and scalability for growing data needs.',
    },
    {
      icon: 'fa-magnifying-glass-chart',
      title: 'Comprehensive Financial Metrics',
      description: 'Detailed financial metrics including P/E ratio, RSI, MACD, OBV, and more, for thorough market analysis. Integrated with historical stock data to offer predictive insights and enable well-informed decision-making.',
    },
    {
      icon: 'fa-user-shield',
      title: 'Personalized Dashboard',
      description: 'Customizable dashboard to track portfolio performance, monitor favorite stocks, and receive personalized insights. Leverages machine learning to suggest optimal trading strategies based on user preferences and market conditions.',
    },
    {
      icon: 'fa-clock',
      title: 'Real-Time Updates',
      description: 'Access to live stock price updates, real-time market news, and alerts on market-moving events. The system integrates with financial APIs and updates seamlessly, ensuring users stay informed.',
    }
  ];

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
              <h1 className={`text-4xl md:text-5xl font-bold ${isDark ? 'text-white' : 'text-black'} mb-6`}>
                Advanced Features for
                <span className="text-green-500"> Smart Trading</span>
              </h1>
              <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-700'} max-w-3xl mx-auto`}>
                Powered by a cutting-edge XGBoost prediction model with 93% accuracy, robust DBMS architecture, and machine learning-driven market insights.
              </p>
            </div>
          </div>
        </div>
      </div>
      <br/>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`${
                isDark ? 'bg-gray-800/50' : 'bg-gray-100'
              } backdrop-blur-sm rounded-xl p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/10`}
            >
              <div className="bg-green-500/20 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <i className={`fas ${feature.icon} text-green-500 text-xl`}></i>
              </div>
              <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-black'} mb-3`}>
                {feature.title}
              </h3>
              <p className={`${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Details Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10"></div>
        </div>
        
        <div className="relative py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-black'} mb-6`}>
                Technical Excellence
              </h2>
              <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-700'} max-w-2xl mx-auto`}>
                Built with cutting-edge technologies, including machine learning, AWS, and real-time data processing.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className={`${
                  isDark ? 'bg-gray-800/50' : 'bg-gray-100'
                } backdrop-blur-sm rounded-xl p-6 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300`}
              >
                <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-black'} mb-4`}>Machine Learning Model</h3>
                <ul className={`space-y-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {[
                    'XGBoost algorithm for stock price prediction',
                    '93% accuracy in stock price prediction',
                    'Trained with historical OHLCV data and technical indicators',
                    'Real-time data processing and model updates',
                    'Advanced feature engineering for improved model performance'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <i className="fas fa-check text-green-500 mr-2"></i>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`${
                  isDark ? 'bg-gray-800/50' : 'bg-gray-100'
                } backdrop-blur-sm rounded-xl p-6 hover:shadow-lg hover:shadow-green-500/10 transition-all duration-300`}
              >
                <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-black'} mb-4`}>Database Architecture</h3>
                <ul className={`space-y-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {[
                    'AWS RDS for robust, scalable database management',
                    'Real-time synchronization of stock prices, news, and metrics',
                    'Optimized query processing for high performance',
                    'Scalable infrastructure to handle large volumes of financial data'
                  ].map((item, index) => (
                    <li key={index} className="flex items-center">
                      <i className="fas fa-check text-green-500 mr-2"></i>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
