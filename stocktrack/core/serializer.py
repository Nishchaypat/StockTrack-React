from rest_framework import serializers

class StockPriceSerializer(serializers.Serializer):
    # Adjust the field names to match the tuple structure
    date = serializers.DateField()
    symbol = serializers.CharField(max_length=10)
    open = serializers.FloatField()
    high = serializers.FloatField()
    low = serializers.FloatField()
    close = serializers.FloatField()
    volume = serializers.IntegerField()

    def to_representation(self, instance):
        # The instance is expected to be a tuple, so we manually map the tuple to field names
        return {
            'date': instance[2],  # date is at index 2 in the tuple
            'symbol': instance[1],  # symbol is at index 1 in the tuple
            'open': instance[3],  # open is at index 3 in the tuple
            'high': instance[4],  # high is at index 4 in the tuple
            'low': instance[5],  # low is at index 5 in the tuple
            'close': instance[6],  # close is at index 6 in the tuple
            'volume': instance[7],  # volume is at index 7 in the tuple
        }

class FinancialMetricSerializer(serializers.Serializer):
    # Adjust the field names to match the tuple structure
    quarter = serializers.DateField()
    revenue = serializers.FloatField()
    earnings = serializers.FloatField()
    dividends = serializers.FloatField()


    def to_representation(self, instance):
        # The instance is expected to be a tuple, so we manually map the tuple to field names
        return {
            'quarter': instance[2],  # quarter is at index 2 in the tuple
            'revenue': instance[3],  # revenue is at index 3 in the tuple
            'earnings': instance[4],  # earnings is at index 4 in the tuple
            'dividends': instance[5],  # dividends is at index 5 in the tuple

        }

class NewsArticleSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=255)
    content = serializers.CharField()
    published_date = serializers.DateField()

class CompanySerializer(serializers.Serializer):
    symbol = serializers.CharField(max_length=10)
    name = serializers.CharField(max_length=255)
    sector = serializers.CharField(max_length=255)
    industry = serializers.CharField(max_length=255)
    description = serializers.CharField()

    def to_representation(self, instance):
        # The instance is expected to be a tuple, so we manually map the tuple to field names
        return {
            'symbol': instance[0],  # symbol is at index 0 in the tuple
            'name': instance[1],  # name is at index 1 in the tuple
            'sector': instance[2],  # sector is at index 2 in the tuple
            'industry': instance[3],  # industry is at index 3 in the tuple
            'description': instance[4],  # description is at index 4 in the tuple
        }

class CompanyDetailsSerializer(serializers.Serializer):
    company = CompanySerializer()
    stock_prices = StockPriceSerializer(many=True)
    financials = FinancialMetricSerializer(many=True)
    news_articles = NewsArticleSerializer(many=True)

    def to_representation(self, instance):
        return {
            'company': instance['company'],
            'stock_prices': instance['stock_prices'],
            'financials': instance['financials'],
            'news_articles': instance['news_articles'],
        }
