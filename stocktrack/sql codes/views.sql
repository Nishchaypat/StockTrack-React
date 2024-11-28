-- Register user
INSERT INTO auth_user (username, first_name, last_name, email, password, is_active, is_staff, is_superuser, date_joined) 
VALUES ('{email}', '{firstname}', '{lastname}', '{email}', '{hashed_password}', 1, 0, 0, NOW());


-- Login user
SELECT id, password 
FROM auth_user 
WHERE email = '{email}';


-- Fetch user's portfolio along with company details and latest stock price
SELECT p.user_id, c.name AS company_name, c.symbol, 
       sp.date AS latest_date, sp.close AS latest_close_price, 
       SUM(p.quantity * sp.close) AS total_stock_value
FROM core_portfolio p
JOIN core_company c ON p.company_symbol = c.symbol
LEFT JOIN core_stockprice sp ON c.id = sp.company_id
WHERE p.user_id = {user_id}
GROUP BY p.user_id, c.name, c.symbol
ORDER BY sp.date DESC;


-- Check if the company exists and is already in the user's portfolio
SELECT * 
FROM core_company 
WHERE symbol = '{symbol}';

SELECT * 
FROM core_portfolio 
WHERE user_id = {user_id} 
AND company_symbol = '{symbol}';

-- Add company to portfolio if not already present
INSERT INTO core_portfolio (user_id, company_symbol) 
SELECT {user_id}, '{symbol}'
WHERE NOT EXISTS (
    SELECT 1 
    FROM core_portfolio 
    WHERE user_id = {user_id} AND company_symbol = '{symbol}'
);


-- Remove company from portfolio
DELETE FROM core_portfolio 
WHERE user_id = {user_id} 
AND company_symbol = '{symbol}';



-- Fetch a list of companies
SELECT name, symbol 
FROM core_company;



-- Fetch the average actual and predicted values for a company over the last 30 days
SELECT symbol, 
       AVG(actual) AS avg_actual, 
       AVG(predicted) AS avg_predicted, 
       COUNT(*) AS prediction_count 
FROM core_prediction 
WHERE symbol = '{company_id}' 
AND date >= CURDATE() - INTERVAL 30 DAY
GROUP BY symbol;



-- Fetch company details, latest stock price, financial metrics, and news
SELECT c.name, c.symbol, 
       sp.date AS latest_date, sp.close AS latest_close_price,
       fm.revenue, fm.earnings, fm.pe_ratio, fm.market_cap, 
       na.title, na.published_date
FROM core_company c
LEFT JOIN core_stockprice sp ON c.id = sp.company_id
LEFT JOIN core_financialmetric fm ON c.id = fm.company_id
LEFT JOIN core_newsarticle na ON c.id = na.company_id
WHERE c.symbol = '{ticker}'
ORDER BY sp.date DESC, na.published_date DESC;



-- Calculate the average closing price for a company over the last 30 days
SELECT company_id, AVG(close) AS avg_close_price 
FROM core_stockprice 
WHERE company_id = {company_id}
AND date >= CURDATE() - INTERVAL 30 DAY
GROUP BY company_id;



-- Fetch user profile details
SELECT id, username, first_name, last_name, email, date_joined
FROM auth_user 
WHERE id = {user_id};



-- Update user profile information
UPDATE auth_user 
SET first_name = '{firstName}', last_name = '{lastName}', email = '{email}' 
WHERE id = {user_id};

-- Update user password if current password matches
UPDATE auth_user 
SET password = '{hashed_new_password}' 
WHERE email = '{email}' 
AND password = '{hashed_current_password}';



-- Delete user account
DELETE FROM auth_user 
WHERE id = {user_id};



-- Change user password
UPDATE auth_user 
SET password = '{hashed_new_password}' 
WHERE email = '{email}';

