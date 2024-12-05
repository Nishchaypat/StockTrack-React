# core/views.py

from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User, Company, Portfolio, StockPrice, NewsArticle, FinancialMetric, EconomicIndicator
from .serializer import PortfolioSerializer, UserSerializer, CompanySerializer, ChangePasswordSerializer
import json
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password, check_password
from rest_framework.authtoken.models import Token
import mysql.connector

@csrf_exempt
@api_view(['POST'])
def register_user(request):
    data = request.data
    print(f"Register?: {data}")
    user = User.objects.create_user(
        username=data['email'],  # Using email as the username
        first_name=data['firstname'],
        last_name=data['lastname'],
        email=data['email'],
        password=data['password']
    )
    return Response({'message': 'Registration successful'})


@csrf_exempt
@api_view(['POST'])
def login_user(request):
    data = request.data
    print(f"Login?: {data}")
    try:
        # Retrieve the user by email
        user = User.objects.get(email=data['email'])
        # Check if the provided password matches the stored hash
        if check_password(data['password'], user.password):
            # Authenticate the user and log them in
            login(request, user)
            token, created = Token.objects.get_or_create(user=user)
            # Include user_id in the response
            print("Login:",user)
            return Response({'message': 'Login successful', 'token': token.key, 'user_id': user.id})
        else:
            return Response({'error': 'Invalid credentials'}, status=400)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=404)


@api_view(['GET'])
def view_dashboard(request, user_id):
    print(f"Authenticated user dashboard: {request.user}, {request.user.id}, {int(user_id)}") 

    if not request.user.is_authenticated:
        return Response({"error": "User not authenticated"}, status=401)

    if request.user.id != int(user_id):
        return Response({"error": "Unauthorized access"}, status=403)

    if not user_id:
        return Response({"error": "User ID is required"}, status=400)

    companies = Company.objects.all()  
    company_data = CompanySerializer(companies, many=True).data
    
    portfolio = Portfolio.objects.filter(user=user_id) 

    portfolio_companies = Company.objects.filter(symbol__in=[item.company_symbol for item in portfolio])
    
    response_data = {
        'companies': company_data,
        'portfolio': CompanySerializer(portfolio_companies, many=True).data 
    }
    #print(response_data['portfolio'])
    return Response(response_data)



@api_view(['GET'])
def view_portfolio(request, user_id):
    print(f"Dashboard: {request.user}, {request.user.id}, {user_id}")  # Debugging output

    if not request.user.is_authenticated:
        return Response({"error": "User not authenticated"}, status=401)

    if request.user.id != int(user_id):
        return Response({"error": "Unauthorized access"}, status=403)

    if not user_id:
        return Response({"error": "User ID is required"}, status=400)


    portfolio = Portfolio.objects.filter(user=user_id)
    portfolio_companies = Company.objects.filter(symbol__in=[item.company_symbol for item in portfolio])

    if not portfolio.exists():
        return Response({"error": "Portfolio not found"}, status=404)

    # Serialize the portfolio data
    portfolio_data = {'portfolio': CompanySerializer(portfolio_companies, many=True).data }
    #print(portfolio_data)
    return Response(portfolio_data)



@api_view(['POST'])
def add_to_portfolio(request):
    print('here at add to portfolio')
    # Ensure the user is authenticated
    if not request.user.is_authenticated:
        return Response({'message': 'User not authenticated'}, status=401)

    # Get the authenticated user ID
    user_id = request.user.id
    #print(user_id)
    # Ensure the symbol is provided
    symbol = request.data.get('symbol')
    if not symbol:
        return Response({'message': 'Symbol is required'}, status=400)

    # Try to get the company based on the symbol
    try:
        company = Company.objects.get(symbol=symbol)
        #print(company)
    except Company.DoesNotExist:
        return Response({'message': 'Company not found'}, status=404)

    # Check if the company is already in the portfolio for the current user
    if Portfolio.objects.filter(user=user_id, company_symbol=symbol).exists():
        return Response({'message': 'Company is already in your portfolio'}, status=400)

    # Create a new portfolio entry for the user and company symbol
    Portfolio.objects.create(user=user_id, company_symbol=symbol)
    portfolios = Portfolio.objects.all()
    #for portfolio in portfolios:
        #print(portfolio)
    return Response({'message': 'Company added to portfolio'})




@api_view(['DELETE'])
def remove_from_portfolio(request):
    print('here at remove from portfolio')
    if not request.user.is_authenticated:
        return Response({"detail": "Authentication credentials were not provided."}, status=401)

    user = request.user.id
    symbol = request.data.get('symbol')
    #print(user, symbol)
    
    if not symbol:
        return Response({"detail": "No symbol provided."}, status=400)

    try:
        # Remove the company from the user's portfolio using symbol
        portfolio_item = Portfolio.objects.get(user=user, company_symbol=symbol)
        portfolio_item.delete()

        return Response({"detail": "Company removed from portfolio successfully."}, status=200)
    except Portfolio.DoesNotExist:
        return Response({"detail": "Company not found in portfolio."}, status=404)
    except Exception as e:
        print(e)
        return Response({"detail": str(e)}, status=400)

@api_view(['GET'])
def company_list(request):
    companies = Company.objects.all().values('name', 'symbol')
    return JsonResponse({'companies': list(companies)})

def get_average_predictions(company_id):
    import mysql.connector

    # Connect to MySQL database on AWS
    conn = mysql.connector.connect(
        host="database-1.cds0coo26frf.us-east-1.rds.amazonaws.com",
        user="adminstocktrack",
        password="Nrp212300",
        port=3306,
        database="stocktrack"
    )

    # Create a cursor
    mycursor = conn.cursor()

    try:
        # Query the database to fetch average predictions for the last 30 days
        query = """
        SELECT 
               AVG(actual) AS avg_actual, 
               AVG(predicted) AS avg_predicted, 
               COUNT(*) AS prediction_count 
        FROM Prediction 
        WHERE symbol = %s 
        AND date >= CURDATE() - INTERVAL 20 DAY
        GROUP BY symbol;
        """
        mycursor.execute(query, (company_id,))
        result = mycursor.fetchone()

        # Return the result in a dictionary format
        if result:
            return {
                'avg_actual': result[0],
                'avg_predicted': result[1],
                'prediction_count': result[2]
            }
        else:
            return None

    except mysql.connector.Error as err:
        raise Exception(f"Error fetching average predictions: {str(err)}")

    finally:
        mycursor.close()
        conn.close()

def get_predictions(company_id):
    # Connect to MySQL database on AWS
    conn = mysql.connector.connect(
        host="database-1.cds0coo26frf.us-east-1.rds.amazonaws.com",
        user="adminstocktrack",
        password="Nrp212300",
        port=3306,
        database="stocktrack"
    )

    # Create a cursor
    mycursor = conn.cursor()
    #print(mycursor)
    try:
        # Query the database to fetch the last 20 predictions for the company
        query = """
        SELECT date, actual, predicted
        FROM Prediction
        WHERE symbol = %s
        ORDER BY date DESC
        LIMIT 20
        """
        mycursor.execute(query, (company_id,))
        predictions = mycursor.fetchall()

        # Return the predictions data in the required format
        return [
            {
                'date': pred[0],
                'actual': pred[1],
                'predicted': pred[2]
            }
            for pred in predictions
        ]

    except mysql.connector.Error as err:
        #print(err)
        raise Exception(f"Error fetching predictions: {str(err)}")

    finally:
        mycursor.close()
        conn.close()

@api_view(['GET'])
def company_details(request, ticker):
    print('Here at company:', ticker)
    try:
        # Fetch company details using the ticker
        company = Company.objects.get(symbol=ticker)
        
        # Get stock prices for the company (latest 5 records)
        stock_prices = StockPrice.objects.filter(company=company).order_by('-date')[:5]
        stock_prices_data = [
            {
                'date': stock.date,
                'open': stock.open_price,
                'high': stock.high,
                'low': stock.low,
                'close': stock.close,
                'volume': stock.volume
            }
            for stock in stock_prices
        ]

        # Get financial metrics for the company (latest 4 quarters)
        financial_metrics = FinancialMetric.objects.filter(company=company).order_by('-quarter')[:4]
        financial_metrics_data = [
            {
                'quarter': fm.quarter,
                'revenue': fm.revenue,
                'earnings': fm.earnings,
                'dividends': fm.dividends,
                'pe_ratio': fm.pe_ratio,  # P/E ratio
                'eps': fm.eps,            # Earnings Per Share
                'market_cap': fm.market_cap,  # Market capitalization
                'beta': fm.beta           # Beta value (volatility)
            }
            for fm in financial_metrics
        ]

        # Get news articles for the company (latest 5 articles)
        news_articles = NewsArticle.objects.filter(company=company).order_by('-published_date')[:5]
        news_articles_data = [
            {
                'title': article.title,
                'content': article.content,
                'published_date': article.published_date.strftime('%Y-%m-%d %H:%M:%S')
            }
            for article in news_articles
        ]
        #print(stock_prices_data)
        eco_indicators = EconomicIndicator.objects.order_by('-date')[:5]

        # Format the economic indicator data
        economic_indicators_data = [
            {
                'date': indicator.date.strftime('%Y-%m-%d'),
                'gdp': round(indicator.gdp, 2),
                'inflation_rate': round(indicator.inflation_rate, 2),
                'interest_rate': round(indicator.interest_rate, 2)
            }
            for indicator in eco_indicators
        ]
        # Fetch prediction data using the get_predictions function
        prediction_data = get_predictions(ticker)
        avg_predictions = get_average_predictions(ticker)
        #print(prediction_data)
        #print(news_articles_data)
        # Prepare the data to return
        company_data = {
            'name': company.name,
            'symbol': company.symbol,
            'sector': company.sector,
            'industry': company.industry,
            'description': company.description,
            'stock_prices': stock_prices_data,
            'financial_metrics': financial_metrics_data,
            'news_articles': news_articles_data,
            'predictions': prediction_data,  # Include predictions here
            'average_predictions': avg_predictions,
            'economic_indicators': economic_indicators_data
        }
        return JsonResponse(company_data)

    except Company.DoesNotExist:
        return JsonResponse({'error': 'Company not found'}, status=404)

    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)

@api_view(['GET'])
def get_user_profile(request, user_id):
    print('here at get_user_profile')
    try:
        user = User.objects.get(id=user_id)
        serializer = UserSerializer(user)
        return Response(serializer.data)
    except User.DoesNotExist:
        return Response({"detail": "User not found"}, status=404)



@api_view(['PUT'])
def update_user_profile(request, user_id):
    print('here at update_user_profile')
    try:
        user = User.objects.get(id=user_id)

        if user != request.user:
            return Response({"detail": "Permission denied"}, status=403)
        if request.data:
            user.first_name = request.data['firstName']
            user.last_name = request.data['lastName']
            user.email = request.data['email']
        if request.data['currentPassword'] and request.data['newPassword']:
            change_user_password(request)

        user.save()

        user_serializer = UserSerializer(user)

        return Response(user_serializer.data, status=200)

    except User.DoesNotExist:
        return Response({"detail": "User not found"}, status=404)



@api_view(['DELETE'])
def delete_user(request, user_id):
    try:
        print('here at delete_user')
        user = User.objects.get(id=user_id)
        if user != request.user:
            return Response({"detail": "You do not have permission to delete this user."}, status=403)
        
        user.delete()
        return Response({"detail": "User deleted successfully."}, status=204)
    except User.DoesNotExist:
        return Response({"detail": "User not found."}, status=404)
    


def change_user_password(request):
    curr_pass = request.data['currentPassword']
    try:
        user = User.objects.get(email=request.data['email'])
        print('here at change_user_password')
        if check_password(curr_pass, user.password):
            user.password = make_password(request.data['newPassword'])
            #print("Password updated")
            user.save()
            #print("Saved to database")
            return True
        else:
            print("Current password check failed")
    except User.DoesNotExist:
        #print("User not found")
        return False
