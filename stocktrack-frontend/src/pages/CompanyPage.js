import React, { useState, useEffect, useContext, useCallback, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar.js';
import { CanvasJSChart } from 'canvasjs-react-charts';
import { AlertCircle, TrendingUp, DollarSign, Newspaper, Download } from 'lucide-react';

const CompanyPage = () => {
  const { isDark } = useTheme();
  const { auth } = useContext(AuthContext);
  const { ticker } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [showFullDescription, setShowFullDescription] = useState(false);
  const chartRef = useRef(null);

  const apiUrl = process.env.REACT_APP_API_URL || (
    window.location.origin.includes('localhost') 
      ? 'http://localhost:8000' 
      : 'https://stocktrack-react.onrender.com'
  );

  const fetchCompanyData = useCallback(async () => {
    if (!ticker) return null;
    try {
      const response = await axios.get(`${apiUrl}/api/company/${ticker}/`, {
        headers: {
          Authorization: auth.token ? `Token ${auth.token}` : ''
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
        if (mounted && data) setCompany(data);
      } catch (err) {
        if (mounted) {
          setError(err.message);
          console.error('Error fetching company data:', err);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };
    loadData();
    return () => { mounted = false; };
  }, [fetchCompanyData]);

  const formatNumber = (num) => {
    if (!num) return 'N/A';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num);
  };

  const formatLargeNumber = (num) => {
    if (!num) return 'N/A';
    if (num >= 1e12) return `${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
    return num.toLocaleString();
  };

  const renderStockChart = () => {
    if (!company?.predictions?.length) {
      return (
        <div className="mt-6 bg-gray-800 rounded-xl p-6 flex items-center justify-center h-64">
          <p className="text-gray-400">No prediction data available</p>
        </div>
      );
    }

    const actualData = company.predictions.map(prediction => ({
      x: new Date(prediction.date),
      y: Number(prediction.actual)
    }));

    const predictedData = company.predictions.map(prediction => ({
      x: new Date(prediction.date),
      y: Number(prediction.predicted)
    }));

    const allValues = [...actualData, ...predictedData].map(point => point.y);
    const minY = Math.min(...allValues) * 0.95;
    const maxY = Math.max(...allValues) * 1.05;

    const options = {
      animationEnabled: true,
      theme: isDark ? "dark2" : "light2",
      backgroundColor: isDark ? "#1F2937" : "#FFFFFF",
      zoomEnabled: true,
      exportEnabled: true,
      axisX: {
        title: "Date",
        valueFormatString: "DD MMM, YYYY",
        labelFontColor: isDark ? "#E5E7EB" : "#374151",
        titleFontColor: isDark ? "#E5E7EB" : "#374151",
        lineColor: isDark ? "#4B5563" : "#D1D5DB",
        gridColor: isDark ? "#374151" : "#E5E7EB",
        crosshair: {
          enabled: true,
          snapToDataPoint: true,
          labelBackgroundColor: isDark ? "#4B5563" : "#E5E7EB"
        }
      },
      axisY: {
        title: "Price (USD)",
        includeZero: false,
        prefix: "$",
        minimum: minY,
        maximum: maxY,
        labelFontColor: isDark ? "#E5E7EB" : "#374151",
        titleFontColor: isDark ? "#E5E7EB" : "#374151",
        lineColor: isDark ? "#4B5563" : "#D1D5DB",
        gridColor: isDark ? "#374151" : "#E5E7EB",
        crosshair: {
          enabled: true,
          snapToDataPoint: true,
          labelBackgroundColor: isDark ? "#4B5563" : "#E5E7EB"
        }
      },
      legend: {
        cursor: "pointer",
        fontColor: isDark ? "#E5E7EB" : "#374151",
        itemclick: (e) => {
          if (typeof e.dataSeries.visible === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
          } else {
            e.dataSeries.visible = true;
          }
          chartRef.current?.render();
        }
      },
      toolTip: {
        shared: true,
        backgroundColor: isDark ? "#374151" : "#FFFFFF",
        fontColor: isDark ? "#E5E7EB" : "#374151",
        cornerRadius: 6,
        borderThickness: 0
      },
      data: [
        {
          type: "spline",
          name: "Actual Price",
          showInLegend: true,
          markerSize: 6,
          markerType: "circle",
          xValueFormatString: "DD MMM, YYYY",
          yValueFormatString: "$#,##0.00",
          dataPoints: actualData,
          color: "#10B981",
          lineThickness: 3
        },
        {
          type: "spline",
          name: "Predicted Price",
          showInLegend: true,
          markerSize: 6,
          markerType: "circle",
          xValueFormatString: "DD MMM, YYYY",
          yValueFormatString: "$#,##0.00",
          dataPoints: predictedData,
          color: "#3B82F6",
          lineThickness: 3
        }
      ]
    };

    return (
      <div className="mt-6 bg-gray-800 rounded-xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">Price Analysis</h3>
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <span className="px-3 py-1 text-sm bg-green-500/20 text-green-500 rounded-full">
                Actual
              </span>
              <span className="px-3 py-1 text-sm bg-blue-500/20 text-blue-500 rounded-full">
                Predicted
              </span>
            </div>
            <button 
              onClick={() => chartRef.current?.exportChart({ format: "png" })}
              className="p-2 rounded-full hover:bg-gray-700 transition-colors"
              title="Download Chart"
            >
              <Download className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        </div>
        <div className="h-[500px] w-full">
          <CanvasJSChart options={options} onRef={ref => chartRef.current = ref} />
        </div>
      </div>
    );
  };

  const renderTabs = () => (
    <div className="flex space-x-4 border-b border-gray-700 mb-6">
      {[
        { id: 'overview', label: 'Overview', icon: TrendingUp },
        { id: 'financials', label: 'Financials', icon: DollarSign },
        { id: 'news', label: 'News', icon: Newspaper },
      ].map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => setActiveTab(id)}
          className={`flex items-center space-x-2 px-4 py-2 border-b-2 transition-colors ${
            activeTab === id 
              ? 'border-blue-500 text-blue-500' 
              : 'border-transparent text-gray-400 hover:text-gray-300'
          }`}
        >
          <Icon size={18} />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center h-64 text-red-500">
          <AlertCircle className="mr-2" />
          <span>Error: {error}</span>
        </div>
      );
    }

    if (!company) {
      return (
        <div className="flex items-center justify-center h-64 text-gray-400">
          Company not found
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <br/>
        <div className="bg-gray-800 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">{company.name}</h1>
              <p className="text-xl text-blue-500 font-semibold">{company.symbol}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Sector</p>
              <p className="text-white">{company.sector || 'N/A'}</p>
              <p className="text-sm text-gray-400 mt-2">Industry</p>
              <p className="text-white">{company.industry || 'N/A'}</p>
            </div>
          </div>
          {company.description && (
            <div className="mt-4">
              <div className="text-gray-300 leading-relaxed max-w-4xl">
                <p className="text-lg font-medium text-blue-400 mb-2">About</p>
                <p className="whitespace-pre-wrap break-words">
                  {showFullDescription ? company.description : (
                    <>
                      {company.description.slice(0, 300)}
                      <span className="text-gray-400">...</span>
                      <button
                        className="ml-2 text-blue-500 hover:text-blue-400 focus:outline-none"
                        onClick={() => setShowFullDescription(true)}
                      >
                        Read more
                      </button>
                    </>
                  )}
                  {showFullDescription && (
                    <button
                      className="ml-2 text-blue-500 hover:text-blue-400 focus:outline-none"
                      onClick={() => setShowFullDescription(false)}
                    >
                      Read less
                    </button>
                  )}
                </p>
              </div>
            </div>
          )}
        </div>

        {renderTabs()}

        {activeTab === 'overview' && (
          <>
            {renderStockChart()}
            {company.stock_prices?.length > 0 && (
              <div className="bg-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Recent Stock Prices</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-700">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-gray-400">Date</th>
                        <th className="px-4 py-3 text-right text-gray-400">Open</th>
                        <th className="px-4 py-3 text-right text-gray-400">High</th>
                        <th className="px-4 py-3 text-right text-gray-400">Low</th>
                        <th className="px-4 py-3 text-right text-gray-400">Close</th>
                        <th className="px-4 py-3 text-right text-gray-400">Volume</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700">
                      {company.stock_prices.slice(0, 5).map((stock, index) => (
                        <tr key={stock.date || index}>
                          <td className="px-4 py-3 text-white">{stock.date}</td>
                          <td className="px-4 py-3 text-right text-white">{formatNumber(stock.open)}</td>
                          <td className="px-4 py-3 text-right text-white">{formatNumber(stock.high)}</td>
                          <td className="px-4 py-3 text-right text-white">{formatNumber(stock.low)}</td>
                          <td className={`px-4 py-3 text-right font-medium ${
                            stock.close > stock.open 
                              ? 'text-green-500' 
                              : stock.close < stock.open 
                                ? 'text-red-500' 
                                : 'text-gray-400'
                          }`}>
                            {formatNumber(stock.close)}
                          </td>
                          <td className="px-4 py-3 text-right text-white">{formatLargeNumber(stock.volume)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === 'financials' && company.financial_metrics?.length > 0 && (
          <div className="bg-gray-800 rounded-xl p-6">
            <h3 className="text-xl font-semibold text-white mb-4">Financial Metrics</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-4 py-3 text-left text-gray-400">Quarter</th>
                    <th className="px-4 py-3 text-right text-gray-400">Revenue</th>
                    <th className="px-4 py-3 text-right text-gray-400">Earnings</th>
                    <th className="px-4 py-3 text-right text-gray-400">EPS</th>
                    <th className="px-4 py-3 text-right text-gray-400">P/E Ratio</th>
                    <th className="px-4 py-3 text-right text-gray-400">Market Cap</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {company.financial_metrics.map((metric, index) => (
                    <tr key={metric.quarter || index}>
                      <td className="px-4 py-3 text-white">{metric.quarter}</td>
                      <td className="px-4 py-3 text-right text-white">{formatLargeNumber(metric.revenue)}</td>
                      <td className="px-4 py-3 text-right text-white">{formatLargeNumber(metric.earnings)}</td>
                      <td className="px-4 py-3 text-right text-white">{metric.eps}</td>
                      <td className="px-4 py-3 text-right text-white">{metric.pe_ratio}</td>
                      <td className="px-4 py-3 text-right text-white">{formatLargeNumber(metric.market_cap)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'news' && company.news_articles?.length > 0 && (
          <div className="space-y-6">
            {company.news_articles.map((article, index) => (
              <div 
                key={article.title || index} 
                className="bg-gray-800 rounded-xl p-6"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start gap-4">
                    <h4 className="text-lg font-semibold text-white">
                      {article.title}
                    </h4>
                    <span className="text-sm text-gray-400 whitespace-nowrap">
                      {new Date(article.published_date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-400 mt-2 text-sm leading-relaxed">
                    {article.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={isDark ? 'min-h-screen bg-gray-900' : 'min-h-screen bg-white'}>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default CompanyPage;