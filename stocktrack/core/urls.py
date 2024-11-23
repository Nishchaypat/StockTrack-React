# core/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.register_user),
    path('login/', views.login_user),
    path('portfolio/add/', views.add_to_portfolio),
    path('dashboard/<user_id>/', views.view_dashboard),
    path('company/<str:ticker>/', views.company_details, name='company-details'),
    path('watchlist/<user_id>/', views.view_portfolio),
    path('portfolio/remove/', views.remove_from_portfolio),
    path('user/<user_id>/', views.get_user_profile, name='get_user_profile'),
    path('user/<user_id>/update/', views.update_user_profile, name='update_user_profile'),
    path('change_password/', views.update_user_password, name='change_user_password'),
    path('companies/', views.company_list, name='company_list'),

]

