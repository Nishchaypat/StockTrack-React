import React from 'react';
import Navbar from '../components/Navbar';
import { useTheme } from '../context/ThemeContext';

const ModelPage = () => {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <Navbar />
      
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20"></div>
          <div className="absolute inset-0 opacity-10">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute h-px bg-blue-500"
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

        <div className="relative pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className={`text-4xl md:text-5xl font-bold ${isDark ? 'text-white' : 'text-black'} mb-6`}>
                Advanced Stock Price
                <span className="text-blue-500"> Prediction Model</span>
              </h1>
              <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-700'} max-w-3xl mx-auto`}>
                Ensemble machine learning model combining technical indicators and XGBoost for accurate stock price predictions
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-12">
          
          {/* Data Collection & Processing */}
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-8 shadow-lg`}>
            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>Data Collection & Processing</h2>
            <div className="space-y-6">
              <div>
                <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>Data Sources</h3>
                <ul className={`list-disc pl-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li>Yahoo Finance API integration using yfinance</li>
                  <li>Historical price data: Open, High, Low, Close, Volume</li>
                  <li>Maximum available historical data for comprehensive training</li>
                </ul>
              </div>
              
              <div>
                <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>Data Preprocessing</h3>
                <ul className={`list-disc pl-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li>Outlier removal using IQR method</li>
                  <li>Standard scaling for price features</li>
                  <li>Logarithmic transformation for volume data</li>
                  <li>Forward and backward filling for missing values</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Technical Indicators */}
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-8 shadow-lg`}>
            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>Technical Indicators</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className={`${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <th className={`px-4 py-2 text-left ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Indicator</th>
                    <th className={`px-4 py-2 text-left ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Parameters</th>
                    <th className={`px-4 py-2 text-left ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Purpose</th>
                  </tr>
                </thead>
                <tbody className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                  <tr>
                    <td className="px-4 py-2">SMA</td>
                    <td className="px-4 py-2">15 days</td>
                    <td className="px-4 py-2">Trend identification</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">EMA</td>
                    <td className="px-4 py-2">5 days</td>
                    <td className="px-4 py-2">Short-term momentum</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">RSI</td>
                    <td className="px-4 py-2">15 days</td>
                    <td className="px-4 py-2">Overbought/Oversold conditions</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Bollinger Bands</td>
                    <td className="px-4 py-2">56 days, 2 std</td>
                    <td className="px-4 py-2">Volatility measurement</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">MACD</td>
                    <td className="px-4 py-2">Default</td>
                    <td className="px-4 py-2">Trend direction and momentum</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">ADX</td>
                    <td className="px-4 py-2">Default</td>
                    <td className="px-4 py-2">Trend strength</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Aroon</td>
                    <td className="px-4 py-2">Up/Down</td>
                    <td className="px-4 py-2">Trend identification and strength</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* XGBoost Model */}
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-8 shadow-lg`}>
            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>XGBoost Model Architecture</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>Hyperparameter Search Space</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <tbody className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                      <tr>
                        <td className="px-4 py-2">n_estimators</td>
                        <td className="px-4 py-2">[5, 10, 20, 25, 30, 35, 40]</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2">max_depth</td>
                        <td className="px-4 py-2">[3, 4, 5]</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2">learning_rate</td>
                        <td className="px-4 py-2">[0.01, 0.1, 0.2]</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2">subsample</td>
                        <td className="px-4 py-2">[0.6, 0.8, 1.0]</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2">colsample_bytree</td>
                        <td className="px-4 py-2">[0.6, 0.8, 1.0]</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2">reg_alpha</td>
                        <td className="px-4 py-2">[0, 0.1, 1]</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2">reg_lambda</td>
                        <td className="px-4 py-2">[1, 10, 100]</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div>
                <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>Model Features</h3>
                <ul className={`list-disc pl-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <li>Objective: reg:squarederror</li>
                  <li>15-fold cross-validation</li>
                  <li>RandomizedSearchCV for optimization</li>
                  <li>R² scoring for parameter selection</li>
                  <li>MSE, RMSE for evaluation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
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

export default ModelPage;