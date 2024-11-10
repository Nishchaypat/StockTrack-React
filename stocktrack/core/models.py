from django.db import models
from django.contrib.auth.models import AbstractUser


class User(models.Model):
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    
    # Adding related_name to avoid clashes
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='core_user_set',  # Custom related_name to avoid clash
        blank=True,
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='core_user_permissions_set',  # Custom related_name to avoid clash
        blank=True,
    )
    def __str__(self):
        return self.email
    # Auto-incremented ID is handled by Django by default for models
    # The 'id' field is automatically generated, so you do not need to add anything here.


class Company(models.Model):
    symbol = models.CharField(max_length=10, unique=True)  # Ensures symbol is unique
    name = models.CharField(max_length=255)
    sector = models.CharField(max_length=255)
    industry = models.CharField(max_length=255)
    description = models.TextField()

    def __str__(self):
        return f"{self.name} ({self.symbol})"


class Portfolio(models.Model):
    user = models.IntegerField()
    company_symbol = models.CharField(max_length=10)

    class Meta:
        unique_together = ('user', 'company_symbol')

    def __str__(self):
        return f"User {self.user} - Company {self.company_symbol}"




class StockPrice(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    date = models.DateField()
    open_price = models.FloatField()
    high = models.FloatField()
    low = models.FloatField()
    close = models.FloatField()
    volume = models.IntegerField()

    def __str__(self):
        return f"{self.company.symbol} on {self.date}"


class FinancialMetric(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    quarter = models.CharField(max_length=10)
    revenue = models.FloatField()
    earnings = models.FloatField()
    dividends = models.FloatField()
    pe_ratio = models.FloatField(null=True, blank=True)  # Price-to-Earnings Ratio
    eps = models.FloatField(null=True, blank=True)       # Earnings per Share
    market_cap = models.FloatField(null=True, blank=True)  # Market Capitalization
    beta = models.FloatField(null=True, blank=True)       # Beta Value (volatility measure)

    def __str__(self):
        return f"{self.company.symbol} Q{self.quarter}"


class NewsArticle(models.Model):
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    content = models.TextField()
    published_date = models.DateTimeField()

    def __str__(self):
        return f"Article: {self.title} for {self.company.symbol}"


class EconomicIndicator(models.Model):
    gdp = models.FloatField()
    inflation_rate = models.FloatField()
    interest_rate = models.FloatField()
    date = models.DateField()

    def __str__(self):
        return f"Economic Indicator for {self.date}"
