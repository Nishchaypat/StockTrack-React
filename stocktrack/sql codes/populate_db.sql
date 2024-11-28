-- Insert or update company information in the Company table
INSERT INTO Company (symbol, name, sector, industry, description)
VALUES (%s, %s, %s, %s, %s)
ON DUPLICATE KEY UPDATE
    name = VALUES(name),           -- Update company name if it already exists
    sector = VALUES(sector),       -- Update sector if it already exists
    industry = VALUES(industry),   -- Update industry if it already exists
    description = VALUES(description); -- Update description if it already exists



-- Insert stock price data into the StockPrice table
INSERT INTO StockPrice (company_symbol, date, open_price, high, low, close, volume)
VALUES (%s, %s, %s, %s, %s, %s, %s);



-- Insert financial metrics into the FinancialMetric table
INSERT INTO FinancialMetric (company_symbol, quarter, revenue, earnings, dividends, pe_ratio, eps, market_cap, beta)
VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s);



-- Insert news articles into the NewsArticle table
INSERT INTO NewsArticle (company_symbol, title, content, published_date)
VALUES (%s, %s, %s, %s);



-- Repeated segments follow the same logic as above:
-- Insert or update company details
INSERT INTO Company (symbol, name, sector, industry, description)
VALUES (%s, %s, %s, %s, %s)
ON DUPLICATE KEY UPDATE
    name = VALUES(name),
    sector = VALUES(sector),
    industry = VALUES(industry),
    description = VALUES(description);



-- Insert stock price data
INSERT INTO StockPrice (company_symbol, date, open_price, high, low, close, volume)
VALUES (%s, %s, %s, %s, %s, %s, %s);



-- Insert financial metrics
INSERT INTO FinancialMetric (company_symbol, quarter, revenue, earnings, dividends, pe_ratio, eps, market_cap, beta)
VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s);



-- Insert news articles
INSERT INTO NewsArticle (company_symbol, title, content, published_date)
VALUES (%s, %s, %s, %s);
