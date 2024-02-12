from django.shortcuts import render
from django.db.models import Count
from django.contrib.auth.models import User
from django.http import JsonResponse, HttpResponse
from post.models import BlogPost
from django.template.defaultfilters import truncatechars_html


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

 

def author_profile(request,username):

    user = User.objects.filter(username=username).first()
    if not user:
        return render(request, "not_found.html", {"message":"the user you are looking for does not exist!"})
        
    return render(request, 'profile.html')



def author_profile_data(request, username):
 
    user = User.objects.filter(username=username).first()
    
    if not user:
        return JsonResponse({"user not found":True})

    posts= BlogPost.objects.all().filter(author=user)
     
    data1= {
        "avatar_url": user.profile.avatar.url,
        "username":user.username,
        "about_me":user.profile.about_me,
        'facebook_url':user.profile.facebook_url,
        "insta_url":user.profile.instagram_url,
        "twitter_url":user.profile.twitter_url,
        # "view_count":user.profile.view_count
    }

    data2=[]
  
    for post in posts:
        post_data = {
            'title': truncatechars_html(post.title,35),
            'content': truncatechars_html(post.content,90),
            'category': post.category.name if post.category else "",
            # 'tags': [tag.name for tag in post.tags.all()],
            'created_at': post.created_at.strftime('%d %B %Y'),
            'featured_image_url': post.featured_image.url if post.featured_image else "",
            'author_name': post.author.username if post.author else None,
            'readtime': post.readtime,
            'author_image': post.author.profile.avatar.url,
            'slug':post.slug,
        }

        data2.append(post_data)
    
    return JsonResponse({"data1":data1, "data2":data2})