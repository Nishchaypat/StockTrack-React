from django.contrib import admin
from core.models import Company, StockPrice, FinancialMetric, NewsArticle, Portfolio

admin.site.register(Company)
admin.site.register(StockPrice)
admin.site.register(FinancialMetric)
admin.site.register(NewsArticle)
admin.site.register(Portfolio)