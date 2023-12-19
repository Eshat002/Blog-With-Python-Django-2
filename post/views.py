from django.shortcuts import render
from django.http import JsonResponse
from .models import *
from datetime import date,timedelta,datetime
import calendar


def post(request):
    return render (request, 'post.html')


def get_featured_posts(request):
    data = []
    featured_posts = BlogPost.objects.filter(is_featured=True)[:2]

    for post in featured_posts:
        post_data = {
            'title': post.title,
            'content': post.content,
            'category': post.category.name,
            'tags': [tag.name for tag in post.tags.all()],
            'created_at': post.created_at.strftime('%d %B %Y'),
            'featured_image_url': post.featured_image.url if post.featured_image else None,
            'author_name': post.author.username if post.author else None,
            'readtime': post.readtime,
        }
        data.append(post_data)

    return JsonResponse({'featured_posts': data})