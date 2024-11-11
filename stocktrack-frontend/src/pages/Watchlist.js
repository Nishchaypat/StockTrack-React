import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext'; // Import the useTheme hook
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Watchlist = () => {
  const { auth } = useContext(AuthContext);
  const { isDark, toggleTheme } = useTheme();
  const [portfolio, setPortfolio] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  const { userId } = useParams(); // Assuming dynamic userId from URL
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.token) {
      fetchWatchlistData();
    }
  }, [auth.token]);

  const fetchWatchlistData = async () => {
    try {
      setLoading(true);
      const apiUrl = process.env.REACT_APP_API_URL 
      ? process.env.REACT_APP_API_URL 
      : (window.location.origin.includes('localhost') 
          ? 'http://localhost:8000' 
          : 'https://stocktrack-react.onrender.com');

      const response = await axios.get(`${apiUrl}/api/watchlist/${userId}/`, {
        headers: {
          Authorization: `Token ${auth.token}`,
        },
      });

      if (response.data && response.data.portfolio) {
        setPortfolio(response.data.portfolio);
      } else {
        console.error('Invalid API response:', response);
      }
    } catch (error) {
      console.error('Error fetching Watchlist data:', error);
    } finally {
      setLoading(false);
    }
  };

  // const handleAddToPortfolio = async (symbol) => {
  //   try {
  //     const companyToAdd = portfolio.find(company => company.symbol === symbol);
  //     setPortfolio([...portfolio, companyToAdd]);

  //     const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000';
  //     await axios.post(
  //       `${apiUrl}/api/portfolio/add/`, 
  //       { symbol },
  //       {
  //         headers: {
  //           Authorization: `Token ${auth.token}`,
  //         },
  //       }
  //     );
  //   } catch (error) {
  //     console.error('Error adding company to portfolio:', error);
  //     alert('Failed to add company to portfolio. Please try again.');
  //   }
  // };

  const handleRemoveFromPortfolio = async (symbol) => {
    try {
      setPortfolio(portfolio.filter(company => company.symbol !== symbol)); // Optimistic UI update
  
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:8000'; 
      await axios.delete(
        `${apiUrl}/api/portfolio/remove/`,
        {
          data: { symbol },
          headers: {
            Authorization: `Token ${auth.token}`,
          },
        }
      );
    } catch (error) {
      console.error('Error removing company from portfolio:', error);
      alert('Failed to remove company from portfolio. Please try again.');
    }
  };
  

  const filteredPortfolio = portfolio.filter(company => {
    const matchesSearch =
      company.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className={`p-6 ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <div className="mb-8 flex items-center justify-between">
        <input
          type="text"
          placeholder="Search by symbol or company name..."
          className={`w-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'} text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className={`bg-gray-800 rounded-xl overflow-hidden ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
        {loading ? (
          <div className="text-center text-white">Loading...</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-gray-700">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Ticker</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Sector</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Industry</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Remove</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-300'}`}>
              {filteredPortfolio.map((company) => (
                <tr
                  key={company.symbol}
                  className={`hover:bg-gray-700 cursor-pointer transition-colors ${isDark ? 'text-white' : 'text-black'}`}
                  onClick={() => {
                    setSelectedCompany(company);
                    navigate(`/company/${company.symbol}`);
                  }}
                >
                  <td className="px-6 py-4">
                    <span className="text-blue-400 font-medium">{company.symbol}</span>
                  </td>
                  <td className="px-6 py-4">{company.name}</td>
                  <td className="px-6 py-4">{company.sector}</td>
                  <td className="px-6 py-4">{company.industry}</td>
                  <td className="px-6 py-4">
                    {/* <button
                      className="text-gray-400 hover:text-yellow-400 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToPortfolio(company.symbol);
                      }}
                    >
                      <i className="fas fa-star"></i>
                    </button> */}
                    <button
                      className="text-gray-400 hover:text-red-400 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFromPortfolio(company.symbol);
                      }}
                    >
                      <i className="fas fa-trash"></i> {/* Trash icon for removal */}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Watchlist;
