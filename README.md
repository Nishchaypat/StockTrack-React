# StockTrack

StockTrack is an advanced stock tracking platform that empowers investors with AI-powered stock predictions, real-time market insights, and comprehensive financial analysis. Built on cutting-edge machine learning models, real-time data processing, and robust database management, StockTrack is designed to help you trade smarter and manage your stock portfolio with ease. [Link] (https://aistockvision.netlify.app/)

## Key Features

### AI-Powered Price Prediction
StockTrack utilizes a highly accurate XGBoost model trained on historical stock price data and technical indicators. Achieving 93% accuracy, this model provides precise stock price predictions, enabling users to make data-driven investment decisions.

### Sentiment Analysis
StockTrack integrates real-time sentiment analysis of financial news from trusted sources like Bloomberg, CNBC, and the Wall Street Journal. By leveraging natural language processing (NLP), the platform tracks market sentiment and provides actionable insights to guide investment strategies.

### Robust Database Management
Powered by AWS RDS, StockTrack's database architecture ensures efficient data storage and management. The platform provides real-time updates for stock prices, financial metrics, and news articles, offering high availability and scalability to accommodate growing data needs.

### Comprehensive Financial Metrics
StockTrack offers detailed financial metrics, such as the P/E ratio, RSI, MACD, OBV, and more, integrated with historical stock data. These metrics provide thorough market analysis and predictive insights to aid in well-informed decision-making.

### Personalized Dashboard
StockTrack provides a customizable dashboard that allows users to track portfolio performance, monitor their favorite stocks, and receive personalized insights. The platform leverages machine learning to suggest optimal trading strategies based on user preferences and real-time market conditions.

### Real-Time Updates
Stay informed with live stock price updates, real-time market news, and alerts on market-moving events. StockTrack integrates with financial APIs for seamless, real-time data synchronization.

### Advanced Stock Price Prediction Model
The platform uses a machine learning-based ensemble model, combining technical indicators and XGBoost, to provide highly accurate stock price predictions. 

### Automated Risk Assessment
StockTrack continuously evaluates market conditions and performs automated risk assessments to guide users in managing potential risks within their portfolios.

---

## Project Overview

StockTrack integrates advanced machine learning techniques, real-time stock data, and sentiment analysis to provide investors with accurate predictions and deep insights into the market. Developed as part of a DBMS class project, this platform combines the power of machine learning with robust database management to create a seamless, scalable stock tracking solution.

### What Sets StockTrack Apart?
- **93% accuracy in stock predictions** powered by an XGBoost machine learning model.
- **Sentiment analysis from major financial news sources** for actionable insights.
- **Real-time stock price and market data synchronization** through AWS cloud services.
  
StockTrack helps investors make smarter decisions by offering a powerful combination of data, predictions, and personalized insights.

---

## Technical Stack

- **Machine Learning**: XGBoost for stock price prediction, real-time data processing, and feature engineering.
- **Database Architecture**: AWS RDS for scalable and efficient data management.
- **Front-End**: React.js for a dynamic and responsive user interface.

---

## Key Functionalities

### Basic Functions
- User management and profile customization
- Real-time stock price tracking
- Company financial metrics analysis
- Advanced search and filtering capabilities
- Portfolio management

### Advanced Features
- AI-powered stock price predictions
- News sentiment analysis
- Personalized investment insights
- Real-time market updates
- Automated risk assessment

---

## Database Overview

StockTrack's database stores essential information, including stock predictions, user profiles, financial metrics, stock prices, and news articles. 

### Key Tables in the Database:

- **Predictions Table**: Stores historical stock price predictions and actual values.
- **User Table**: Contains user profiles (email, name, password).
- **Company Table**: Stores information about different companies, including their stock symbol, sector, and industry.
- **Financial Metrics Table**: Includes key financial metrics such as P/E ratio and EPS for each company.
- **Stock Price Table**: Stores real-time stock price data for companies.
- **News Articles Table**: Contains articles related to stocks and financial news.

---

## Machine Learning Model

### XGBoost for Stock Price Prediction
- **Accuracy**: 93% in predicting stock prices.
- **Training Data**: Historical OHLCV data, technical indicators, and financial metrics.
- **Real-time Model Updates**: The model is continuously updated with real-time data for improved predictions.

### Technical Indicators Used:
- **SMA**: 15-day Simple Moving Average for trend identification.
- **EMA**: 5-day Exponential Moving Average for short-term momentum.
- **RSI**: 15-day Relative Strength Index for overbought/oversold conditions.
- **MACD**: Moving Average Convergence Divergence for trend direction and momentum.
- **Bollinger Bands**: Volatility measurement with a 56-day window and 2 standard deviations.
- **ADX**: Average Directional Index for trend strength.
- **Aroon**: For identifying trend strength and direction.

### Hyperparameter Tuning:
- **Search Space**: Includes n_estimators, max_depth, learning_rate, subsample, colsample_bytree, and more.
- **Optimization**: RandomizedSearchCV for hyperparameter optimization.
- **Evaluation**: Model performance is evaluated using R² scoring, MSE, and RMSE.

---

## Conclusion

StockTrack combines powerful AI, real-time data, and comprehensive financial metrics to provide users with the tools they need to make smarter investment decisions. With its user-friendly interface, personalized insights, and cutting-edge machine learning models, StockTrack is a comprehensive solution for anyone looking to track stocks and manage their portfolio efficiently.

---

## Connect with Me

[LinkedIn](https://www.linkedin.com/in/nishchay-pat/)
