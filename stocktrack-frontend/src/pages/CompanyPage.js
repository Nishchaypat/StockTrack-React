import React, { useState, useEffect, useContext, useCallback } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar.js'; // Assuming you have a Navbar component
import { useTheme } from '../context/ThemeContext';

const CompanyPage = () => {
  const { isDark } = useTheme();
  const { auth } = useContext(AuthContext);
  const { ticker } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = process.env.REACT_APP_API_URL 
  ? process.env.REACT_APP_API_URL 
  : (window.location.origin.includes('localhost') 
      ? 'http://localhost:8000' 
      : 'https://stocktrack-react.onrender.com');

  const fetchCompanyData = useCallback(async () => {
    if (!ticker) return null;

    try {
      const response = await axios.get(`${apiUrl}/api/company/${ticker}/`, {
        headers: {
          Authorization: auth.token ? `Token ${auth.token}` : '',
        },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  }, [ticker, auth.token, apiUrl]);

  useEffect(() => {
    let mounted = true;

    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchCompanyData();

        if (mounted && data) {
          setCompany(data);
        }
      } catch (err) {
        if (mounted) {
          setError(err.message);
          console.error('Error fetching company data:', err);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadData();

    return () => {
      mounted = false;
    };
  }, [fetchCompanyData]);

  const renderContent = () => {
    if (loading) {
      return <div className="text-center text-white pulse-animation">Loading...</div>;
    }

    if (error) {
      return <div className="text-center text-white">Error: {error}</div>;
    }

    if (!company) {
      return <div className="text-center text-white">Company not found</div>;
    }

    return (
      <div className="p-6 space-y-8">
        <div className="bg-gray-800 rounded-xl shadow-xl p-8">
          <h2 className="text-4xl font-bold text-white text-center">{company.name} ({company.symbol})</h2>
          <p className="text-sm text-gray-400 text-center mt-2">Sector: {company.sector} | Industry: {company.industry}</p>

          {company.description && (
            <div className="mt-6">
              <h3 className="text-2xl font-semibold text-white">Description:</h3>
              <p className="text-white mt-2">{company.description}</p>
            </div>
          )}

          {company.stock_prices?.length > 0 && (
            <div className="mt-6">
              <h3 className="text-2xl font-semibold text-white">Stock Prices:</h3>
              <div className="overflow-x-auto mt-4">
                <table className="min-w-full text-white">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-6 py-3">Date</th>
                      <th className="px-6 py-3">Open</th>
                      <th className="px-6 py-3">High</th>
                      <th className="px-6 py-3">Low</th>
                      <th className="px-6 py-3">Close</th>
                      <th className="px-6 py-3">Volume</th>
                    </tr>
                  </thead>
                  <tbody>
                    {company.stock_prices.map((stock, index) => (
                      <tr
                        key={stock.date || index}
                        className="border-b border-gray-700 hover:bg-gray-800"
                      >
                        <td className="px-6 py-4">{stock.date}</td>
                        <td className="px-6 py-4">{stock.open}</td>
                        <td className="px-6 py-4">{stock.high}</td>
                        <td className="px-6 py-4">{stock.low}</td>
                        <td
                          className={`px-6 py-4 ${stock.close > stock.open
                              ? 'text-green-500'
                              : stock.close < stock.open
                              ? 'text-red-500'
                              : 'text-gray-500'
                            }`}
                        >
                          {stock.close}
                        </td>
                        <td className="px-6 py-4">{stock.volume}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {company.financial_metrics?.length > 0 && (
            <div className="mt-6">
              <h3 className="text-2xl font-semibold text-white">Financial Metrics:</h3>
              <div className="overflow-x-auto mt-4">
                <table className="min-w-full text-white">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-6 py-3">Quarter</th>
                      <th className="px-6 py-3">Revenue</th>
                      <th className="px-6 py-3">Earnings</th>
                      <th className="px-6 py-3">Dividends</th>
                      <th className="px-6 py-3">P/E Ratio</th>
                      <th className="px-6 py-3">EPS</th>
                      <th className="px-6 py-3">Market Cap</th>
                      <th className="px-6 py-3">Beta</th>
                    </tr>
                  </thead>
                  <tbody>
                    {company.financial_metrics.map((metric, index) => (
                      <tr
                        key={metric.quarter || index}
                        className="border-b border-gray-700 hover:bg-gray-800"
                      >
                        <td className="px-6 py-4">{metric.quarter}</td>
                        <td className="px-6 py-4">{metric.revenue}</td>
                        <td className="px-6 py-4">{metric.earnings}</td>
                        <td className="px-6 py-4">{metric.dividends}</td>
                        <td className="px-6 py-4">{metric.pe_ratio}</td>
                        <td className="px-6 py-4">{metric.eps}</td>
                        <td className="px-6 py-4">{metric.market_cap}</td>
                        <td className="px-6 py-4">{metric.beta}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {company.news_articles?.length > 0 && (
            <div className="mt-6">
              <h3 className="text-2xl font-semibold text-white">News Articles:</h3>
              <ul className="space-y-4 mt-4">
                {company.news_articles.map((article, index) => (
                  <li key={article.title || index} className="bg-gray-700 p-4 rounded-lg shadow-md hover:bg-gray-600">
                    <h4 className="font-bold text-white">{article.title}</h4>
                    <p className="text-white mt-2">{article.content}</p>
                    <p className="text-sm text-gray-400 mt-2">{article.published_date}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    );
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
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <style>{pulseKeyframes}</style>

      <div className="container mx-auto p-6">{renderContent()}</div>

      <style>{pulseKeyframes}</style>
    </div>
  );
};

export default CompanyPage;
