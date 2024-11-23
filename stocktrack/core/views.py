from .serializer import CompanyDetailsSerializer
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
import mysql.connector
import bcrypt

# Database connector class
class SQLConnector:
    def __init__(self):
        try:
            self.conn = mysql.connector.connect(
                host="database-1.cds0coo26frf.us-east-1.rds.amazonaws.com",
                user="adminstocktrack",
                password="Nrp212300",
                port=3306,
                database="stocktrack"
            )
            self.mycursor = self.conn.cursor()
        except Exception as e:
            print("Some error occurred:", e)

    def register(self, firstname, lastname, email, password):
        # Hash the password before storing it
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        
        try:
            # Insert user details into the users table, including the hashed password
            self.mycursor.execute(""" 
                INSERT INTO users (firstname, lastname, email, password) 
                VALUES (%s, %s, %s, %s);
            """, (firstname, lastname, email, hashed_password))
            self.conn.commit()
            return True
        except Exception as e:
            print(f"Error: {e}")
            return False

    def login(self, email, password):
        try:
            # Fetch the user data based on the email
            self.mycursor.execute(""" 
                SELECT * FROM users WHERE email = %s;
            """, (email,))
            data = self.mycursor.fetchone()
            if data:
                # The password is stored at index 4 (based on the query result structure)
                stored_hashed_password = data[4]  # Assuming password is in the 5th column (index 4)

                # Compare the entered password (hashed) with the stored password
                if bcrypt.checkpw(password.encode('utf-8'), stored_hashed_password.encode('utf-8')):
                    return data  # Return user data if login is successful
                else:
                    return False  # Incorrect password
            else:
                return False  # No user found with that email

        except Exception as e:
            print(f"Error: {e}")
            return False

    def get_companies(self):
        try:
            self.mycursor.execute("SELECT * FROM companies")
            return self.mycursor.fetchall()
        except Exception as e:
            print(f"Error: {e}")
            return None

    def get_user_portfolio(self, user_id):
        try:
            self.mycursor.execute(""" 
                SELECT * FROM portfolio 
                WHERE user_id = %s;
            """, (user_id,))
            return self.mycursor.fetchall()
        except Exception as e:
            print(f"Error: {e}")
            return None

    def add_to_portfolio(self, user_id, symbol):
        try:
            self.mycursor.execute(""" 
                INSERT INTO portfolio (user_id, symbol) 
                VALUES (%s, %s);
            """, (user_id, symbol))
            self.conn.commit()
            return True
        except Exception as e:
            print(f"Error: {e}")
            return False

    def remove_from_portfolio(self, user_id, symbol):
        try:
            self.mycursor.execute(""" 
                DELETE FROM portfolio 
                WHERE user_id = %s AND symbol = %s;
            """, (user_id, symbol))
            self.conn.commit()
            return True
        except Exception as e:
            print(f"Error: {e}")
            return False

    def get_company_details(self, ticker):
        try:
            self.mycursor.execute(""" 
                SELECT * FROM companies WHERE symbol = %s;
            """, (ticker,))
            return self.mycursor.fetchone()
        except Exception as e:
            print(f"Error: {e}")
            return None

    def get_company_stock_prices(self, symbol):
        try:
            self.mycursor.execute(""" 
                SELECT * FROM stock_prices WHERE symbol = %s ORDER BY date DESC LIMIT 5;
            """, (symbol,))
            return self.mycursor.fetchall()
        except Exception as e:
            print(f"Error: {e}")
            return None

    def get_company_financials(self, symbol):
        try:
            self.mycursor.execute(""" 
                SELECT * FROM financial_metrics WHERE symbol = %s ORDER BY quarter DESC LIMIT 4;
            """, (symbol,))
            return self.mycursor.fetchall()
        except Exception as e:
            print(f"Error: {e}")
            return None

    def get_company_news(self, symbol):
        try:
            self.mycursor.execute(""" 
                SELECT * FROM news_articles WHERE symbol = %s ORDER BY published_date DESC LIMIT 5;
            """, (symbol,))
            return self.mycursor.fetchall()
        except Exception as e:
            print(f"Error: {e}")
            return None

    def get_user_profile(self, user_id):
        try:
            self.mycursor.execute(""" 
                SELECT firstname, lastname, email FROM users WHERE user_id = %s;
            """, (user_id,))
            return self.mycursor.fetchone()
        except Exception as e:
            print(f"Error: {e}")
            return None

    def update_user_profile(self, user_id, firstname, lastname, email):
        try:
            self.mycursor.execute(""" 
                UPDATE users SET firstname = %s, lastname = %s, email = %s WHERE user_id = %s;
            """, (firstname, lastname, email, user_id))
            self.conn.commit()
            return True
        except Exception as e:
            print(f"Error: {e}")
            return False

    def update_user_password(self, email, new_password):
        try:
            # Hash the new password using bcrypt
            hashed_password = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt())

            # Update the password in the database
            self.mycursor.execute(""" 
                UPDATE users SET password = %s WHERE email = %s;
            """, (hashed_password, email))
            self.conn.commit()

            return True
        except Exception as e:
            print(f"Error: {e}")
            return False

# API Views
@api_view(['POST'])
def register_user(request):
    data = request.data
    db = SQLConnector()
    if db.register(data['firstname'], data['lastname'], data['email'], data['password']):
        return Response({'message': 'Registration successful'})
    else:
        return Response({'error': 'Registration failed'}, status=400)

@api_view(['POST'])
def login_user(request):
    data = request.data
    db = SQLConnector()
    user_data = db.login(data['email'], data['password'])
    if user_data:
        user_id = user_data[0]  # Assuming the user ID is the first item in the fetched row
        return Response({'message': 'Login successful', 'user_id': user_id})
    else:
        return Response({'error': 'Invalid credentials'}, status=400)

@api_view(['GET'])
def view_dashboard(request, user_id):
    db = SQLConnector()
    companies = db.get_companies()
    if companies is None:
        return Response({"error": "Failed to fetch companies"}, status=500)

    portfolio = db.get_user_portfolio(user_id)
    if portfolio is None:
        return Response({"error": "Failed to fetch portfolio"}, status=500)

    portfolio_companies = []
    for item in portfolio:
        company = db.get_company_details(item[1])  # Assuming item[1] is the symbol
        if company:
            portfolio_companies.append(company)

    response_data = {
        'companies': companies,
        'portfolio': portfolio_companies
    }
    return Response(response_data)

@api_view(['GET'])
def view_portfolio(request, user_id):
    db = SQLConnector()
    portfolio = db.get_user_portfolio(user_id)  # Assuming a method exists for this query
    if not portfolio:
        return Response({"error": "Portfolio not found"}, status=404)

    portfolio_companies = db.get_companies_by_symbols([item['symbol'] for item in portfolio])
    portfolio_data = {'portfolio': portfolio_companies}

    return Response(portfolio_data)

@api_view(['POST'])
def add_to_portfolio(request):
    user_id = request.data.get('user_id')
    symbol = request.data.get('symbol')
    if not symbol:
        return Response({'message': 'Symbol is required'}, status=400)

    db = SQLConnector()
    company = db.get_company_details(symbol)
    if not company:
        return Response({'message': 'Company not found'}, status=404)

    if db.add_to_portfolio(user_id, symbol):
        return Response({'message': 'Company added to portfolio'})
    else:
        return Response({'message': 'Failed to add company to portfolio'}, status=400)

@api_view(['DELETE'])
def remove_from_portfolio(request):
    user_id = request.data.get('user_id')
    symbol = request.data.get('symbol')
    
    if not symbol:
        return Response({"detail": "No symbol provided."}, status=400)

    db = SQLConnector()
    if db.remove_from_portfolio(user_id, symbol):
        return Response({"detail": "Company removed from portfolio successfully."}, status=200)
    else:
        return Response({"detail": "Company not found in portfolio."}, status=404)

@api_view(['GET'])
def company_list(request):
    db = SQLConnector()
    companies = db.get_companies()
    if companies:
        return JsonResponse({'companies': companies})
    return JsonResponse({'error': 'Failed to fetch companies'}, status=500)

@api_view(['GET'])
def company_details(request, ticker):
    db = SQLConnector()
    company = db.get_company_details(ticker)

    if company:
        # Assuming company is returned as a dictionary or model instance
        stock_prices = db.get_company_stock_prices(ticker)
        financials = db.get_company_financials(ticker)
        news = db.get_company_news(ticker)

        # Prepare the company data as a dictionary for the serializer
        company_data = {
            'company': company,
            'stock_prices': stock_prices,
            'financials': financials,
            'news_articles': news
        }

        # Use the serializer to serialize the data
        serializer = CompanyDetailsSerializer(company_data)
        print(serializer.data)

        # Return the serialized data as JSON
        return Response(serializer.data)

    return Response({'error': 'Company not found'}, status=404)




@api_view(['GET'])
def get_user_profile(request, user_id):
    db = SQLConnector()
    user = db.get_user_profile(user_id)
    if user:
        return Response(user)
    return Response({"detail": "User not found"}, status=404)


@api_view(['POST'])
def update_user_profile(request):
    user_id = request.data.get('user_id')
    firstname = request.data.get('firstname')
    lastname = request.data.get('lastname')
    email = request.data.get('email')

    db = SQLConnector()
    if db.update_user_profile(user_id, firstname, lastname, email):
        return Response({'message': 'Profile updated successfully'})
    return Response({'error': 'Failed to update profile'}, status=400)

def update_user_password(self, email, new_password):
    try:
        # Hash the new password using bcrypt
        hashed_password = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt())

        # Update the password in the database
        self.mycursor.execute("UPDATE users SET password = %s WHERE email = %s", (hashed_password, email))
        self.conn.commit()

        return True
    except Exception as e:
        print(f"Error: {e}")
        return False