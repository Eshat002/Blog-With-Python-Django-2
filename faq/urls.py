from django.urls import path
from . import views



urlpatterns = [
    path('', views.faq),
    path('data/', views.faq_data)
]