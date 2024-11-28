-- Update or insert company details
INSERT INTO Company (symbol, name, sector, industry, description)
VALUES (%s, %s, %s, %s, %s)
ON DUPLICATE KEY UPDATE
    name = VALUES(name),
    sector = VALUES(sector),
    industry = VALUES(industry),
    description = VALUES(description);


-- Update or insert stock price
INSERT INTO StockPrice (company_id, date, open_price, high, low, close, volume)
VALUES (
    (SELECT id FROM Company WHERE symbol = %s),
    %s, %s, %s, %s, %s, %s
)
ON DUPLICATE KEY UPDATE
    open_price = VALUES(open_price),
    high = VALUES(high),
    low = VALUES(low),
    close = VALUES(close),
    volume = VALUES(volume);


-- Update or insert financial metrics
INSERT INTO FinancialMetric (company_id, quarter, revenue, earnings, dividends, pe_ratio, eps, market_cap, beta)
VALUES (
    (SELECT id FROM Company WHERE symbol = %s),
    %s, %s, %s, %s, %s, %s, %s, %s
)
ON DUPLICATE KEY UPDATE
    revenue = VALUES(revenue),
    earnings = VALUES(earnings),
    dividends = VALUES(dividends),
    pe_ratio = VALUES(pe_ratio),
    eps = VALUES(eps),
    market_cap = VALUES(market_cap),
    beta = VALUES(beta);


-- Update or insert economic indicators
INSERT INTO EconomicIndicator (date, gdp, inflation_rate, interest_rate)
VALUES (%s, %s, %s, %s)
ON DUPLICATE KEY UPDATE
    gdp = VALUES(gdp),
    inflation_rate = VALUES(inflation_rate),
    interest_rate = VALUES(interest_rate);
