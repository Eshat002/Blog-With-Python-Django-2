from django.shortcuts import render
from django.db.models import Count
from django.contrib.auth.models import User
from django.http import JsonResponse
 

def author_with_most_posts(request):
    authors = User.objects.annotate(post_count=Count('blogpost')).order_by('-post_count')[:6]
    data=[]
    
    for author in authors:
        author_data = {
         
            'name': author.username,
            'avatar_url': author.profile.avatar.url,
            'total_posts':author.blogpost_set.all().count()
         }
        data.append(author_data)

    return JsonResponse({'authors': data})


