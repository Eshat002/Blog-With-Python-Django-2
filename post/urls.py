from django.urls import path
from django.conf import settings
from . import views

urlpatterns = [
    path('', views.post),
    path('get-featured-posts/', views.get_featured_posts),
    path('get-most-viewed-posts/', views.get_most_viewed_posts),
    # path('get-recent-posts/', views.get_recent_posts),


]
