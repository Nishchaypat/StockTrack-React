import sys
import requests
import yfinance as yf
import datetime
from django.core.management.base import BaseCommand
from core.models import Company, StockPrice, FinancialMetric, NewsArticle
from django.db import IntegrityError
from bs4 import BeautifulSoup
from yahoo_fin import news
import warnings
import pandas as pd
import concurrent.futures
import unicodedata
import json
import re

warnings.filterwarnings('ignore')

# Cleanup function to normalize and remove unwanted characters
def basic_cleanup(text):
    """Performs basic cleanup on the input text"""
    cleaned_text = unicodedata.normalize('NFKD', text).encode('ascii', 'ignore').decode('utf-8', 'ignore')
    cleaned_text = re.sub(r'[^a-zA-Z0-9.,;:!?\'\"()\s]', '', cleaned_text)
    cleaned_text = re.sub(r'\s+', ' ', cleaned_text).strip()
    return cleaned_text

# Function to clean and reformat the date
def clean_date(date_str):
    """Cleans and reformats the date to the required format"""
    # Remove unwanted characters (quotation marks and weekday)
    cleaned_date_str = date_str.strip('“”').split(' ', 1)[1]
    
    # Parse the cleaned date string
    try:
        date_obj = datetime.datetime.strptime(cleaned_date_str, '%d %b %Y %H:%M:%S %z')
        return date_obj.strftime('%Y-%m-%d %H:%M:%S%z')  # Format the date as required
    except ValueError as e:
        print(f"Error processing date: {date_str} - {e}")
        return None  # Or handle the error as appropriate

# Fetch article text from the URL
def get_article_text(url):
    try:
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'html.parser')
            paragraphs = soup.find_all('p')
            article_text = ' '.join([p.get_text() for p in paragraphs])
            article_text = basic_cleanup(article_text)
            return article_text
        else:
            print(f"Failed to get article text from {url}: Status code {response.status_code}")
            return "N/A"
    except Exception as e:
        print(f"Failed to get article text from {url}: {e}")
        return "N/A"

# Preprocess data, fetching article text
def preprocess_data(df: pd.DataFrame) -> pd.DataFrame:
    df = df[['summary', 'link', 'published', 'title']]  # Use relevant columns
    with concurrent.futures.ThreadPoolExecutor() as executor:
        article_texts = list(executor.map(get_article_text, df['link']))
    df['article_text'] = article_texts
    return df

# Stock Data class with news fetching
class StockData:
    def __init__(self, ticker):
        self.ticker = ticker

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

    def news(self):
        print(f"\nFetching news for {self.ticker}...")
        try:
            # Fetch news data from Yahoo Finance using Yahoo Fin API
            stock_news = news.get_yf_rss(self.ticker)
            df = pd.DataFrame(stock_news)
            
            if not df.empty:
                df_clean = preprocess_data(df)
                stock_news_data = []
                # Extract the articles with cleaned data
                for idx, row in df_clean.iterrows():
                    # Clean the published date
                    cleaned_date = clean_date(row['published'])
                    stock_news_data.append({
                        "title": row['title'],
                        "content": row['summary'],
                        "published_date": cleaned_date if cleaned_date else row['published'],  # Use cleaned date
                        "article_text": row['article_text']
                    })
                return stock_news_data
            else:
                print(f"No news found for {self.ticker}.")
                return []
        except Exception as e:
            print(f"Error fetching news for {self.ticker}: {str(e)}")
            return []

class Command(BaseCommand):
    help = 'Populate the database with company data, stock prices, financial metrics, and news articles'

    def handle(self, *args, **kwargs):
        companies = ['JCI', 'HAL', 'DHR', 'RTX', 'HDB', 'V', 'DECK', 'SNDK', 'SQ', 'AXP', 'SLB', 'GS', 'BABA', 'AIG', 'CSCO', 'MCD', 'CRBP', 
                     'OXY', 'TRV', 'CRWD', 'ADI', 'NOC', 'NOW', 'CAT', 'SPY', 'TPR', 'T', 'NKE', 'SNAP', 'RHT', 'CMI', 'GIII', 'SYK', 
                     'BLK', 'STT', 'DDOG', 'UBER', 'COP', 'DBX', 'NET', 'AMZN', 'DIS', 'LRCX', 'MU', 'FIVN', 'NTES', 'ANF', 'TTD', 'ITW',
                     'BDX', 'SYF', 'CRIS', 'GE', 'PFE', 'DOV', 'ETFC', 'LMT', 'WMT', 'HSBC', 'VFC', 'LOW', 'NXPI', 'NFLX', 'TD', 'BILL', 'SCHW', 'ARO', 'MS', 'ABT', 'TSLA',
                     'DE', 'SPGI', 'COF', 'MRNA', 'PGR', 'ESTC', 'TWLO', 'RY', 'VEEV', 'LYFT', 'VLO', 'BA', 'PLCE', 'WFC', 'OKTA', 'VEON', 'NYT', 'INTC', 'HBI', 'AVGO', 'PLAN', 
                     'BMY', 'JNPR', 'QCOM', 'CHK', 'MELI', 'RDS-A', 'GILD', 'IDXX', 'MDT', 'ADDYY', 'ENB', 'HES', 'UNM', 'BAX', 'KO', 'REGN', 'SWKS', 'CME', 'ZM', 'PYPL', 'HUBS', 
                     'STX', 'BP', 'HON', 'PRU', 'VRTX', 'EMR', 'ISRG', 'CTLT', 'P&G', 'FISV', 'XOM', 'MA', 'ORCL', 'PBR', 'MRK', 'BAC', 'TMO', 'GOOGL', 'CROX', 'HD', 'WIX', 'STZ',
                     'AMT', 'BIDU', 'WDC', 'RL', 'C', 'MRO', 'SPOT', 'MO', 'SI', 'RTN', 'MET', 'JNJ', 'CIG', 'AMGN', 'ZS', 'TDG', 'TGT', 'ON', 'ALL', 'VZ', 'LULU',
                     'TXN', 'DOCU', 'AMAT', 'MSFT', 'FB', 'RBLX', 'LNC', 'JPM', 'SHOP', 'AMTD', 'MPC', 'IBM', 'NVDA', 'MMM', 'USB', 'GD', 'UAA', 
                     'DKS', 'IQV', 'KMI', 'TLT', 'XPEV', 'FTNT', 'CVX', 'UNH', 'PEP', 'BNS', 'TSM', 'AAPL', 'TWTR', 'MERR']

        for ticker in companies:
            try:
                stock_data = StockData(ticker)
                
                company_data = stock_data.company()
                company, _ = Company.objects.get_or_create(
                    symbol=ticker,
                    defaults={ 
                        'name': company_data['Name'],
                        'sector': company_data['Sector'],
                        'industry': company_data['Industry'],
                        'description': company_data['Description']
                    }
                )

                # Fetch and store news articles
                news_data = stock_data.news()
                print(ticker)
                for article in news_data:
                    NewsArticle.objects.create(
                        company=company,
                        title=article['title'],
                        content=article['content'],
                        published_date=article['published_date'],
                    )
            
            except IntegrityError as e:
                self.stdout.write(self.style.ERROR(f"Integrity Error processing {ticker}: {str(e)}"))
            except Exception as e:
                self.stdout.write(self.style.ERROR(f"Error processing {ticker}: {str(e)}"))

        self.stdout.write(self.style.SUCCESS('Database populated successfully!'))
