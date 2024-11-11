import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext'; // Import the useTheme hook
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { auth } = useContext(AuthContext);
  const { isDark, toggleTheme } = useTheme(); // Use the theme context
  const [companies, setCompanies] = useState([]);
  const [portfolio, setPortfolio] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(15); // Number of visible rows

  const { userId } = useParams(); // Extract userId from URL (this will be dynamic)
  const navigate = useNavigate(); // For programmatic navigation

  useEffect(() => {
    if (auth.token) {
      fetchDashboardData();
    }
  }, [auth.token]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const apiUrl = process.env.REACT_APP_API_URL 
        ? process.env.REACT_APP_API_URL 
        : (window.location.origin.includes('localhost') 
            ? 'http://localhost:8000' 
            : 'https://stocktrack-react.onrender.com');

      const response = await axios.get(`${apiUrl}/api/dashboard/${userId}/`, {
        headers: {
          Authorization: `Token ${auth.token}`,
        },
      });

      setCompanies(response.data.companies);
      setPortfolio(response.data.portfolio);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToPortfolio = async (symbol) => {
    try {
      // Optimistic update: assume success and update UI immediately
      const companyToAdd = companies.find(company => company.symbol === symbol);
      setPortfolio([...portfolio, companyToAdd]);
      setCompanies(companies.filter(company => company.symbol !== symbol));

      // Make API call to actually add to portfolio
      const apiUrl = process.env.REACT_APP_API_URL 
      ? process.env.REACT_APP_API_URL 
      : (window.location.origin.includes('localhost') 
          ? 'http://localhost:8000' 
          : 'https://stocktrack-react.onrender.com');

      const response = await axios.post(
        `${apiUrl}/api/portfolio/add/`,
        { symbol },
        {
          headers: {
            Authorization: `Token ${auth.token}`,
          },
        }
      );

      // If API call fails or returns an error, we catch it here
      if (response.status !== 200) {
        throw new Error('Failed to add company to portfolio');
      }

      console.log('Company added to portfolio:', response.data);
    } catch (error) {
      console.error('Error adding company to portfolio:', error);

      // Rollback UI if an error occurs
      const companyToAdd = companies.find(company => company.symbol === symbol);
      setCompanies([...companies, companyToAdd]);
      setPortfolio(portfolio.filter(company => company.symbol !== symbol));

      alert('Failed to add company to portfolio. Please try again.');
    }
  };

  const filteredCompanies = companies.filter(company => {
    const matchesSearch =
      company.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className={`p-6 ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}> {/* Conditional background and text color */}
      <div className="mb-8 flex items-center justify-between">
        <input
          type="text"
          placeholder="Search by symbol or company name..."
          className={`w-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'} text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className={`bg-gray-800 rounded-xl overflow-hidden ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}> {/* Conditional container background */}
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Fav</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-gray-700' : 'divide-gray-300'}`}> {/* Conditional table border color */}
              {filteredCompanies.slice(0, visibleCount).map((company) => (
                <tr
                  key={company.symbol}
                  className={`hover:bg-gray-700 cursor-pointer transition-colors ${isDark ? 'text-white' : 'text-black'}`}
                  onClick={() => {
                    setSelectedCompany(company);
                    navigate(`/company/${company.symbol}`); // Navigate to the company's specific page
                  }}
                >
                  <td className="px-6 py-4">
                    <span className="text-blue-400 font-medium">{company.symbol}</span>
                  </td>
                  <td className="px-6 py-4">{company.name}</td>
                  <td className="px-6 py-4">{company.sector}</td>
                  <td className="px-6 py-4">{company.industry}</td>
                  <td className="px-6 py-4">
                    <button
                      className="text-gray-400 hover:text-yellow-400 transition-colors"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToPortfolio(company.symbol);
                      }}
                    >
                      <i className="fas fa-star"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {filteredCompanies.length > visibleCount && (
          <div className="text-center mt-4">
            <button
              onClick={() => setVisibleCount(visibleCount + 15)}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
