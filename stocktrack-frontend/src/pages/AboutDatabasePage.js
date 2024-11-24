import React from 'react';
import Navbar from '../components/Navbar';
import { useTheme } from '../context/ThemeContext';

const AboutDatabasePage = () => {
  const { isDark } = useTheme();

  return (
    <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-100'}`}>
      <Navbar />
      
      {/* Hero Section with Animated Background */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-red-500/20"></div>
          {/* Animated Lines */}
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
                Database
                <span className="text-blue-500"> in StockTrack</span>
              </h1>
              <p className={`text-xl ${isDark ? 'text-gray-300' : 'text-gray-700'} max-w-3xl mx-auto`}>
                Overview of the database structure for the StockTrack platform, which includes data storage for predictions, user profiles, financial metrics, stock prices, and more.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-12">
          {/* Predictions Table (AWS RDS) */}
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-8 shadow-lg`}>
            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>Predictions (AWS RDS)</h2>
            <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
              The `Predictions` table stores historical stock price predictions and actual values.
            </p>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className={`${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <th className={`px-4 py-2 text-left ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Column</th>
                    <th className={`px-4 py-2 text-left ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Type</th>
                    <th className={`px-4 py-2 text-left ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Details</th>
                  </tr>
                </thead>
                <tbody className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                  <tr>
                    <td className="px-4 py-2">id</td>
                    <td className="px-4 py-2">int</td>
                    <td className="px-4 py-2">Primary Key, auto-increment</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">symbol</td>
                    <td className="px-4 py-2">varchar(4)</td>
                    <td className="px-4 py-2">Stock symbol (e.g., AAPL)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">actual</td>
                    <td className="px-4 py-2">decimal(7,2)</td>
                    <td className="px-4 py-2">Actual stock price</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">predicted</td>
                    <td className="px-4 py-2">decimal(7,2)</td>
                    <td className="px-4 py-2">Predicted stock price</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Date</td>
                    <td className="px-4 py-2">datetime</td>
                    <td className="px-4 py-2">Date and time of prediction</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Django Models Section */}
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-8 shadow-lg`}>
            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-8`}>Django MySQL</h2>
            
            <div className="space-y-8">
              {/* User Table */}
              <div>
                <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>User Table</h3>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                  The `User` table stores user profiles, including email, name, and group memberships.
                </p>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className={`${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                        <th className={`px-4 py-2 text-left ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Column</th>
                        <th className={`px-4 py-2 text-left ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Type</th>
                        <th className={`px-4 py-2 text-left ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Details</th>
                      </tr>
                    </thead>
                    <tbody className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                      <tr>
                        <td className="px-4 py-2">id</td>
                        <td className="px-4 py-2">int</td>
                        <td className="px-4 py-2">Primary Key, auto-increment</td>
                    </tr> 
                      <tr>
                        <td className="px-4 py-2">email</td>
                        <td className="px-4 py-2">varchar(225)</td>
                        <td className="px-4 py-2">User's email, must be unique</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2">first_name</td>
                        <td className="px-4 py-2">varchar(12)</td>
                        <td className="px-4 py-2">User's first name</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2">last_name</td>
                        <td className="px-4 py-2">varchar(12)</td>
                        <td className="px-4 py-2">User's last name</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2">password</td>
                        <td className="px-4 py-2">varchar(12)</td>
                        <td className="px-4 py-2">User's Password</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Company Table */}
              <div>
                <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>Company Table</h3>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                  The `Company` table holds information about different companies, including their stock symbol, sector, and industry.
                </p>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className={`${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                        <th className={`px-4 py-2 text-left ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Column</th>
                        <th className={`px-4 py-2 text-left ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Type</th>
                        <th className={`px-4 py-2 text-left ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Details</th>
                      </tr>
                    </thead>
                    <tbody className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    <tr>
                        <td className="px-4 py-2">id</td>
                        <td className="px-4 py-2">int</td>
                        <td className="px-4 py-2">Primary Key, auto-increment</td>
                    </tr>
                      <tr>
                        <td className="px-4 py-2">symbol</td>
                        <td className="px-4 py-2">varchar(4)</td>
                        <td className="px-4 py-2">Unique company stock symbol</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2">name</td>
                        <td className="px-4 py-2">varchar(25)</td>
                        <td className="px-4 py-2">Company name</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2">sector</td>
                        <td className="px-4 py-2">varchar(12)</td>
                        <td className="px-4 py-2">Industry sector</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2">industry</td>
                        <td className="px-4 py-2">varchar(12)</td>
                        <td className="px-4 py-2">Industry type</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2">description</td>
                        <td className="px-4 py-2">varchar(225)</td>
                        <td className="px-4 py-2">Brief company description</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Financial Metrics Table */}
              <div>
                <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>Financial Metrics Table</h3>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                  The `Financial Metrics` table stores key financial indicators such as P/E ratio, earnings per share, and others for each company.
                </p>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className={`${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                        <th className={`px-4 py-2 text-left ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Column</th>
                        <th className={`px-4 py-2 text-left ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Type</th>
                        <th className={`px-4 py-2 text-left ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Details</th>
                      </tr>
                    </thead>
                    <tbody className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                      <tr>
                        <td className="px-4 py-2">company</td>
                        <td className="px-4 py-2">ForeignKey (Company)</td>
                        <td className="px-4 py-2">Company linked to financial data</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2">pe_ratio</td>
                        <td className="px-4 py-2">decimal(7,2)</td>
                        <td className="px-4 py-2">Price-to-earnings ratio</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2">eps</td>
                        <td className="px-4 py-2">decimal(7,2)</td>
                        <td className="px-4 py-2">Earnings per share</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Stock Price Table */}
              {/* Stock Price Table */}
              <div>
                <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>Stock Price Table</h3>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                  The `Stock Price` table stores real-time stock price data.
                </p>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className={`${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                        <th className={`px-4 py-2 text-left ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Column</th>
                        <th className={`px-4 py-2 text-left ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Type</th>
                        <th className={`px-4 py-2 text-left ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Details</th>
                      </tr>
                    </thead>
                    <tbody className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                      <tr>
                        <td className="px-4 py-2">company</td>
                        <td className="px-4 py-2">ForeignKey (Company)</td>
                        <td className="px-4 py-2">Company linked to stock price</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2">price</td>
                        <td className="px-4 py-2">decimal(7,2)</td>
                        <td className="px-4 py-2">Stock price at a given time</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2">date</td>
                        <td className="px-4 py-2">DateTime</td>
                        <td className="px-4 py-2">Date and time of stock price</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* News Article Table */}
              <div>
                <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'} mb-4`}>News Articles Table</h3>
                <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'} mb-4`}>
                  The `News Articles` table stores articles related to stocks and financial news.
                </p>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className={`${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                        <th className={`px-4 py-2 text-left ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Column</th>
                        <th className={`px-4 py-2 text-left ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Type</th>
                        <th className={`px-4 py-2 text-left ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>Details</th>
                      </tr>
                    </thead>
                    <tbody className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                      <tr>
                        <td className="px-4 py-2">headline</td>
                        <td className="px-4 py-2">varchar(225)</td>
                        <td className="px-4 py-2">Article headline</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2">url</td>
                        <td className="px-4 py-2">varchar(25)</td>
                        <td className="px-4 py-2">Link to the full article</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2">publish_date</td>
                        <td className="px-4 py-2">DateTime</td>
                        <td className="px-4 py-2">Date and time of publication</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* AWS Cloud Function Section */}
          <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl p-8 shadow-lg`}>
            <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'} mb-6`}>
              AWS Cloud Function for Data Population
            </h2>
            <div className={`space-y-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              <p>
                An AWS Cloud function is integrated with the platform to automatically populate the database with the latest stock data, predictions, and other metrics.
              </p>
              <p>
                This function pulls data from reliable financial APIs, processes it, and updates the database every hour, ensuring that users always have access to the most up-to-date information.
              </p>
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

export default AboutDatabasePage;