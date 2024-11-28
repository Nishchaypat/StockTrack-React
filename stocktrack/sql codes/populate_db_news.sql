--Get comapny

SELECT id, symbol FROM Company WHERE symbol = '{ticker}';

-- If no rows are returned:
INSERT INTO Company (symbol, name, sector, industry, description)
VALUES ('{ticker}', '{Name}', '{Sector}', '{Industry}', '{Description}');


--Add to news table

INSERT INTO NewsArticle (company_id, title, content, published_date)
VALUES (
    (SELECT id FROM Company WHERE symbol = '{ticker}'),
    '{title}',
    '{content}',
    '{published_date}'
);
