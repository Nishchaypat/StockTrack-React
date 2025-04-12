import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [companies] = useState([
    'JCI', 'HAL', 'DHR', 'RTX', 'HDB', 'V', 'DECK', 'SNDK', 'SQ', 'AXP', 'SLB', 'GS', 'BABA', 'AIG', 'CSCO', 'MCD', 'CRBP', 
    'OXY', 'TRV', 'CRWD', 'ADI', 'NOC', 'NOW', 'CAT', 'SPY', 'TPR', 'T', 'NKE', 'SNAP', 'RHT', 'CMI', 'GIII', 'SYK', 
    'BLK', 'STT', 'DDOG', 'UBER', 'COP', 'DBX', 'NET', 'AMZN', 'DIS', 'LRCX', 'MU', 'FIVN', 'NTES', 'ANF', 'TTD', 'ITW',
    'BDX', 'SYF', 'CRIS', 'GE', 'PFE', 'DOV', 'ETFC', 'LMT', 'WMT', 'HSBC', 'VFC', 'LOW', 'NXPI', 'NFLX', 'TD', 'BILL', 'SCHW', 'ARO', 'MS', 'ABT', 'TSLA',
    'DE', 'SPGI', 'COF', 'MRNA', 'PGR', 'ESTC', 'TWLO', 'RY', 'VEEV', 'LYFT', 'VLO', 'BA', 'PLCE', 'WFC', 'OKTA', 'VEON', 'NYT', 'INTC', 'HBI', 'AVGO', 'PLAN', 
    'BMY', 'JNPR', 'QCOM', 'CHK', 'MELI', 'RDS-A', 'GILD', 'IDXX', 'MDT', 'ADDYY', 'ENB', 'HES', 'UNM', 'BAX', 'KO', 'REGN', 'SWKS', 'CME', 'ZM', 'PYPL', 'HUBS', 
    'STX', 'BP', 'HON', 'PRU', 'VRTX', 'EMR', 'ISRG', 'CTLT', 'P&G', 'FISV', 'XOM', 'MA', 'ORCL', 'PBR', 'MRK', 'BAC', 'TMO', 'GOOGL', 'CROX', 'HD', 'WIX', 'STZ',
    'AMT', 'BIDU', 'WDC', 'RL', 'C', 'MRO', 'SPOT', 'MO', 'SI', 'RTN', 'MET', 'JNJ', 'CIG', 'AMGN', 'ZS', 'TDG', 'TGT', 'ON', 'ALL', 'VZ', 'LULU',
    'TXN', 'DOCU', 'AMAT', 'MSFT', 'FB', 'RBLX', 'LNC', 'JPM', 'SHOP', 'AMTD', 'MPC', 'IBM', 'NVDA', 'MMM', 'USB', 'GD', 'UAA', 
    'DKS', 'IQV', 'KMI', 'TLT', 'XPEV', 'FTNT', 'CVX', 'UNH', 'PEP', 'BNS', 'TSM', 'AAPL', 'TWTR', 'MERR'
  ]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const navigate = useNavigate();

  // Filter companies based on search query
  useEffect(() => {
    if (searchQuery.length >= 1) {
      const filtered = companies.filter(company =>
        company.toLowerCase().includes(searchQuery.toLowerCase()) // Partial match with case-insensitive search
      );
      setFilteredCompanies(filtered);
    } else {
      setFilteredCompanies([]);
    }
  }, [searchQuery, companies]);

  const handleCompanyClick = (symbol) => {
    navigate(`/company/${symbol}`);
  };


  return (
    <nav className="fixed w-full z-50">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gray-800/95 backdrop-blur-sm"></div>
        {/* Animated Lines */}
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-green-500/20"
              style={{
                left: `${i * 25}%`,
                top: `${30 + Math.sin(i) * 20}%`,
                width: '25%',
                transform: 'rotate(-15deg)',
                animation: `pulse${i} 3s infinite ${i * 0.5}s`
              }}
            />
          ))}
          <style>
            {[...Array(5)].map((_, i) => `@keyframes pulse${i} { 0% { opacity: 0.1; transform: translateY(0) rotate(-15deg); } 50% { opacity: 0.3; transform: translateY(-${10 + i * 2}px) rotate(-15deg); } 100% { opacity: 0.1; transform: translateY(0) rotate(-15deg); } }`).join('')}
          </style>
        </div>
      </div>

      {/* Navbar Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side - Logo and Navigation */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <div className="relative w-8 h-8 mr-2">
                <div className="absolute inset-0 bg-green-500 opacity-20 rounded-lg group-hover:opacity-30 transition-opacity"></div>
                <i className="fas fa-chart-line text-green-500 text-2xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></i>
              </div>
              <span className="text-white text-xl font-bold">StockTrack</span>
            </Link>

            <div className="hidden md:flex items-center ml-10 space-x-8">
              <Link to="/features" className="text-gray-300 hover:text-green-400 transition-colors">
                Features
              </Link>
              <Link to="/about" className="text-gray-300 hover:text-green-400 transition-colors">
                About
              </Link>
              <Link to="/dbinfo" className="text-gray-300 hover:text-green-400 transition-colors">
                DB Info
              </Link>
              <Link to="/mlinfo" className="text-gray-300 hover:text-green-400 transition-colors">
                ML Info
              </Link>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-6">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 transition-colors group"
            >
              {isDark ? (
                <svg className="w-5 h-5 text-green-400 group-hover:text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search company..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-700/50 text-white p-2 pl-10 pr-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent w-64"
              />
              {/* Search Icon */}
              <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              
              {filteredCompanies.length > 0 && (
                <ul className="absolute bg-gray-700 text-white w-full mt-1 rounded-lg max-h-60 overflow-y-auto z-10">
                  {filteredCompanies.map((company, index) => (
                    <li
                      key={index}
                      className="p-2 hover:bg-green-500 cursor-pointer"
                      onClick={() => handleCompanyClick(company)}
                    >
                      {company}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/login" className="text-gray-300 hover:text-green-400 transition-colors">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all transform hover:scale-105 shadow-lg hover:shadow-green-500/20"
              >
                Sign Up
              </Link>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-400 hover:text-green-400 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden space-y-4 py-6">
            <Link to="/features" className="block text-gray-300 hover:text-green-400 transition-colors">
              Features
            </Link>
            <Link to="/about" className="block text-gray-300 hover:text-green-400 transition-colors">
              About
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
