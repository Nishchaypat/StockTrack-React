# Generated by Django 5.0.3 on 2024-11-22 20:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Companies',
            fields=[
                ('symbol', models.CharField(max_length=10, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('sector', models.CharField(blank=True, max_length=255, null=True)),
                ('industry', models.CharField(blank=True, max_length=255, null=True)),
                ('description', models.TextField(blank=True, null=True)),
            ],
            options={
                'db_table': 'companies',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='FinancialMetrics',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quarter', models.DateField()),
                ('revenue', models.FloatField(blank=True, null=True)),
                ('earnings', models.FloatField(blank=True, null=True)),
                ('dividends', models.FloatField(blank=True, null=True)),
            ],
            options={
                'db_table': 'financial_metrics',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='NewsArticles',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(blank=True, max_length=255, null=True)),
                ('content', models.TextField(blank=True, null=True)),
                ('published_date', models.DateTimeField(blank=True, null=True)),
            ],
            options={
                'db_table': 'news_articles',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='StockPrices',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('open_price', models.FloatField(blank=True, null=True)),
                ('high', models.FloatField(blank=True, null=True)),
                ('low', models.FloatField(blank=True, null=True)),
                ('close', models.FloatField(blank=True, null=True)),
                ('volume', models.IntegerField(blank=True, null=True)),
            ],
            options={
                'db_table': 'stock_prices',
                'managed': False,
            },
        ),
        migrations.CreateModel(
            name='Users',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('firstname', models.CharField(blank=True, max_length=255, null=True)),
                ('lastname', models.CharField(blank=True, max_length=255, null=True)),
                ('email', models.CharField(blank=True, max_length=255, null=True, unique=True)),
                ('password', models.CharField(blank=True, max_length=255, null=True)),
            ],
            options={
                'db_table': 'users',
                'managed': False,
            },
        ),
        migrations.RemoveField(
            model_name='stockprice',
            name='company',
        ),
        migrations.RemoveField(
            model_name='financialmetric',
            name='company',
        ),
        migrations.RemoveField(
            model_name='newsarticle',
            name='company',
        ),
        migrations.DeleteModel(
            name='EconomicIndicator',
        ),
        migrations.RemoveField(
            model_name='user',
            name='groups',
        ),
        migrations.RemoveField(
            model_name='user',
            name='user_permissions',
        ),
        migrations.AlterModelOptions(
            name='portfolio',
            options={'managed': False},
        ),
        migrations.DeleteModel(
            name='StockPrice',
        ),
        migrations.DeleteModel(
            name='FinancialMetric',
        ),
        migrations.DeleteModel(
            name='Company',
        ),
        migrations.DeleteModel(
            name='NewsArticle',
        ),
        migrations.DeleteModel(
            name='User',
        ),
    ]
