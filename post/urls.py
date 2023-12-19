from django.urls import path
from django.conf import settings
from . import views

urlpatterns = [
    path('', views.post),
    path('get-featured-posts/', views.get_featured_posts),

]
