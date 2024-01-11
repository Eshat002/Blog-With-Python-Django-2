from django.urls import path 
from . import views


urlpatterns = [
    path('author-with-most-posts/', views.author_with_most_posts),
    path('<str:username>/', views.author_profile),
]