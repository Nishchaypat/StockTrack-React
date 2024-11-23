# # This is an auto-generated Django model module.
# # You'll have to do the following manually to clean this up:
# #   * Rearrange models' order
# #   * Make sure each model has one field with primary_key=True
# #   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
# #   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# # Feel free to rename the models, but don't rename db_table values or field names.
# from django.db import models


# class Companies(models.Model):
#     symbol = models.CharField(primary_key=True, max_length=10)
#     name = models.CharField(max_length=255)
#     sector = models.CharField(max_length=255, blank=True, null=True)
#     industry = models.CharField(max_length=255, blank=True, null=True)
#     description = models.TextField(blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'companies'


# class FinancialMetrics(models.Model):
#     symbol = models.ForeignKey(Companies, models.DO_NOTHING, db_column='symbol')
#     quarter = models.DateField()
#     revenue = models.FloatField(blank=True, null=True)
#     earnings = models.FloatField(blank=True, null=True)
#     dividends = models.FloatField(blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'financial_metrics'


# class NewsArticles(models.Model):
#     symbol = models.ForeignKey(Companies, models.DO_NOTHING, db_column='symbol')
#     title = models.CharField(max_length=255, blank=True, null=True)
#     content = models.TextField(blank=True, null=True)
#     published_date = models.DateTimeField(blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'news_articles'


# class Portfolio(models.Model):
#     user = models.ForeignKey('Users', models.DO_NOTHING)
#     symbol = models.ForeignKey(Companies, models.DO_NOTHING, db_column='symbol')
#     created_at = models.DateTimeField(blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'portfolio'


# class StockPrices(models.Model):
#     symbol = models.ForeignKey(Companies, models.DO_NOTHING, db_column='symbol')
#     date = models.DateField()
#     open_price = models.FloatField(blank=True, null=True)
#     high = models.FloatField(blank=True, null=True)
#     low = models.FloatField(blank=True, null=True)
#     close = models.FloatField(blank=True, null=True)
#     volume = models.IntegerField(blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'stock_prices'


# class Users(models.Model):
#     firstname = models.CharField(max_length=255, blank=True, null=True)
#     lastname = models.CharField(max_length=255, blank=True, null=True)
#     email = models.CharField(unique=True, max_length=255, blank=True, null=True)
#     password = models.CharField(max_length=255, blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'users'

