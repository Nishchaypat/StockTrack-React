import sys
import requests
import yfinance as yf
import datetime
from django.core.management.base import BaseCommand
from core.models import Company, StockPrice, FinancialMetric, NewsArticle
from django.db import IntegrityError

class StockData:
    def __init__(self, ticker):
        self.ticker = ticker
        self.news_api = '8950c31b2f2d406ea056828f40160adc'

    def company(self):
        ticker = yf.Ticker(self.ticker)
        info = ticker.info
        company_data = {
            "Name": info.get('longName'),
            "Sector": info.get('sector'),
            "Industry": info.get('industry'),
            "Description": info.get('longBusinessSummary')
        }
        return company_data

    def stockprice(self):
        today = datetime.date.today()
        last_week = today - datetime.timedelta(days=7)

        stock_data = yf.download(self.ticker, start=last_week, end=today)
        stock_data.reset_index(inplace=True)
        stock_data['Date'] = stock_data['Date'].dt.strftime('%Y-%m-%d')
        stock_data = stock_data.iloc[-1]  # Get the latest row
        row_data = {
            'Date': stock_data['Date'],
            'Open': stock_data['Open'],
            'High': stock_data['High'],
            'Low': stock_data['Low'],
            'Close': stock_data['Close'],
            'Volume': int(stock_data['Volume'])
        }
        return [row_data]  # Return as a list for consistency

    def finmetric(self):
        ticker = yf.Ticker(self.ticker)
        financials = ticker.financials
        income_stmt = ticker.income_stmt
        dividends = ticker.dividends

        if financials.empty or income_stmt.empty:
            print("Financials or income statement data is not available.")
            return {}

        # Retrieving latest financial data
        latest_financials = financials.iloc[:, 0]
        latest_income = income_stmt.iloc[:, 0]
        latest_dividend = dividends.iloc[-1].item() if not dividends.empty else 0

        # Retrieve important indicators from the ticker info
        info = ticker.info
        pe_ratio = info.get('trailingPE', None)  # P/E ratio
        eps = info.get('epsTrailingTwelveMonths', None)  # Earnings Per Share
        market_cap = info.get('marketCap', None)  # Market capitalization
        beta = info.get('beta', None)  # Beta value (volatility)

        finmetric_data = {
            "quarter": latest_income.name.strftime('%Y-%m-%d'),
            "revenue": latest_financials['Total Revenue'],
            "earnings": latest_income['Net Income'],
            "dividends": latest_dividend,
            "pe_ratio": pe_ratio,
            "eps": eps,
            "market_cap": market_cap,
            "beta": beta
        }
        
        return finmetric_data


    def news(self):
        today = datetime.date.today()
        yesterday = today - datetime.timedelta(days=4)
        ticker = yf.Ticker(self.ticker)
        query = f"{ticker} stock"
        url = f'https://newsapi.org/v2/everything?q={query}&from={yesterday.strftime("%Y-%m-%d")}&to={today.strftime("%Y-%m-%d")}&sortBy=popularity&language=en&apiKey={self.news_api}'

        response = requests.get(url)
        news_data = response.json()
        stock_news_data = []
        print(news_data)
        if news_data.get('status') == 'ok' and news_data.get('articles'):
            for article in news_data['articles'][:3]:  # Limit to 3 articles
                # Ensure the date is parsed correctly
                published_date = article['publishedAt']
                published_date = datetime.strptime(published_date, '%Y-%m-%dT%H:%M:%SZ')  # Parsing the published date
                
                stock_news_data.append({
                    "title": article['title'],
                    "content": article['description'],
                    "published_date": published_date  # Use parsed datetime
                })
        else:
            print("No news articles available.")

        return stock_news_data


class Command(BaseCommand):
    help = 'Populate the database with company data, stock prices, financial metrics, and news articles'

    def handle(self, *args, **kwargs):
        companies = ['JCI', 'HAL', 'DHR', 'RTX', 'HDB', 'V', 'DECK', 'SNDK', 'SQ', 'AXP', 'SLB', 'GS', 'BABA', 'AIG', 'CSCO', 'MCD', 'CRBP', 
                     'OXY', 'TRV', 'CRWD', 'ADI', 'NOC', 'NOW', 'CAT', 'SPY', 'TPR', 'T', 'NKE', 'SNAP', 'RHT', 'CMI', 'GIII', 'SYK', 
                     'BLK', 'STT', 'DDOG', 'UBER', 'COP', 'DBX', 'NET', 'AMZN', 'DIS', 'LRCX', 'MU', 'FIVN', 'NTES', 'ANF', 'TTD', 'ITW',
                       'BDX', 'SYF', 'CRIS', 'GE', 'PFE', 'DOV', 'ETFC', 'LMT', 'WMT', 'HSBC', 'VFC', 'LOW', 'NXPI', 'NFLX', 'TD', 'BILL', 'SCHW', 'ARO', 'MS', 'ABT', 'TSLA',
                         'DE', 'SPGI', 'COF', 'MRNA', 'PGR', 'ESTC', 'TWLO', 'RY', 'VEEV', 'LYFT', 'VLO', 'BA', 'PLCE', 'WFC', 'OKTA', 'VEON', 'NYT', 'INTC', 'HBI', 'AVGO', 'PLAN', 
                         'BMY', 'JNPR', 'QCOM', 'CHK', 'MELI', 'RDS-A', 'GILD', 'IDXX', 'MDT', 'ADDYY', 'ENB', 'HES', 'UNM', 'BAX', 'KO', 'REGN', 'SWKS', 'CME', 'ZM', 'PYPL', 'HUBS', 
                         'STX', 'BP', 'HON', 'PRU', 'VRTX', 'EMR', 'ISRG', 'CTLT', 'P&G', 
                     'FISV', 'XOM', 'MA', 'ORCL', 'PBR', 'MRK', 'BAC', 'TMO', 'GOOGL', 'CROX', 'HD', 'WIX', 'STZ',
                      'AMT', 'BIDU', 'WDC', 'RL', 'C', 'MRO', 'SPOT', 'MO', 'SI', 'RTN', 'MET', 'JNJ', 'CIG', 'AMGN', 'ZS', 'TDG', 'TGT', 'ON', 'ALL', 'VZ', 'LULU',
                        'TXN', 'DOCU', 'AMAT', 'MSFT', 'FB', 'RBLX', 'LNC', 'JPM', 'SHOP', 'AMTD', 'MPC', 'IBM', 'NVDA', 'MMM', 'USB', 'GD', 'UAA', 
                     'DKS', 'IQV', 'KMI', 'TLT', 'XPEV', 'FTNT', 'CVX', 'UNH', 'PEP', 'BNS', 'TSM', 'AAPL', 'TWTR', 'MERR']

        for ticker in companies:
            try:
                stock_data = StockData(ticker)
                
                company_data = stock_data.company()
                company, created = Company.objects.get_or_create(
                    symbol=ticker,
                    defaults={ 
                        'name': company_data['Name'],
                        'sector': company_data['Sector'],
                        'industry': company_data['Industry'],
                        'description': company_data['Description']
                    }
                )
                self.stdout.write(self.style.SUCCESS(f"{'Created' if created else 'Updated'} company: {ticker}"))

                stockprice_data = stock_data.stockprice()
                for stock in stockprice_data:
                    StockPrice.objects.create(
                        company=company,
                        date=stock['Date'],
                        open_price=stock['Open'],
                        high=stock['High'],
                        low=stock['Low'],
                        close=stock['Close'],
                        volume=stock['Volume']
                    )

                finmetric_data = stock_data.finmetric()
                if finmetric_data:
                    FinancialMetric.objects.create(
                        company=company,
                        quarter=finmetric_data['quarter'],
                        revenue=finmetric_data['revenue'],
                        earnings=finmetric_data['earnings'],
                        dividends=finmetric_data['dividends'],
                        pe_ratio=finmetric_data.get('pe_ratio', None),  # P/E ratio
                        eps=finmetric_data.get('eps', None),            # Earnings Per Share
                        market_cap=finmetric_data.get('market_cap', None),  # Market capitalization
                        beta=finmetric_data.get('beta', None)           # Beta value (volatility)
                    )

                news_data = stock_data.news()
                for article in news_data:
                    NewsArticle.objects.create(
                        company=company,
                        title=article['title'],
                        content=article['content'],
                        published_date=article['published_date']
                    )

            except IntegrityError as e:
                self.stdout.write(self.style.ERROR(f"Integrity Error processing {ticker}: {str(e)}"))
            except Exception as e:
                self.stdout.write(self.style.ERROR(f"Error processing {ticker}: {str(e)}"))

        self.stdout.write(self.style.SUCCESS('Database populated successfully!'))

