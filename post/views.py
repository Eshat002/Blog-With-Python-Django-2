from django.shortcuts import render
from django.http import JsonResponse
from .models import *
from django.db.models import F, Sum
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from profiles.models import Visitor
from django.utils import timezone
from readtime import of_html
from subscriber.models import Subscriber
from django.core.exceptions import ValidationError,ObjectDoesNotExist
from django.db.models import Q
from django.utils.safestring import mark_safe
from django.template.defaultfilters import truncatechars_html
from django.db.models import Count
from profiles.models import Profile
from operator import attrgetter



def post(request):
    queryset = BlogPost.objects.all()

    # Number of items to display per page
    items_per_page = 10
    paginator = Paginator(queryset, items_per_page)

    # Get the current page number from the request's GET parameters
    page = request.GET.get('page')

    try:
        # Get the specified page
        objects = paginator.page(page)
    except PageNotAnInteger:
        # If the page parameter is not an integer, show the first page
        objects = paginator.page(1)
    except EmptyPage:
        # If the page is out of range (e.g., 9999), deliver the last page
        objects = paginator.page(paginator.num_pages)
    return render (request, 'post.html', {'objects':  objects,} )

 

def get_featured_posts(request):
    data = []
    featured_posts = BlogPost.objects.filter(is_featured=True)[:2]
 
    for post in featured_posts:
        
        post_data = {
            # "id":post.id, 
            'title': truncatechars_html(post.title, 35),
            # 'content': f'{post.content[:90]}...' if len(post.content) > 90 else post.content[:90],
            'content':  truncatechars_html(post.content, 90), 
            'category': post.category.name if post.category else "",
            # 'tags': [tag.name for tag in post.tags.all()],
            'created_at': post.created_at.strftime('%d %B %Y'),
            'featured_image_url': post.featured_image.url if post.featured_image else "",
            'author_name': post.author.username if post.author else None,
            'readtime': post.readtime,
            'author_image': post.author.profile.avatar.url,
            'slug':post.slug
        }
        data.append(post_data)

    return JsonResponse({'featured_posts': data})



def get_most_viewed_posts(request):
    most_viewed_posts = BlogPost.objects.annotate(num_views=Count('view')).order_by('-num_views')[:8]

    data=[]

    for post in most_viewed_posts:
        post_data = {
            # "id":post.id,
            'title': post.title[:40],
            'content': f'{post.content[:110]}...' if len(post.content) > 110 else post.content[:110],
            'category': post.category.name if post.category else "",
            # 'tags': [tag.name for tag in post.tags.all()],
            'created_at': post.created_at.strftime('%d %B %Y'),
            # 'featured_image_url': post.featured_image.url if post.featured_image else "",
            'author_name': post.author.username if post.author else None,
            'readtime': post.readtime,
            'views': View.objects.filter(post=post).count(),
            'author_image':post.author.profile.avatar.url,
            'slug':post.slug
        }
        data.append(post_data)

    return JsonResponse({'most_viewed_posts': data})
    


# def get_recent_posts(request):
#     recent_post = BlogPost.objects.all()
#     print("recent",recent_post.count())
#     data=[]
#     for post in recent_post:
#         post_data = {
#             "id":post.id,
#             'title': post.title[:40],
#             'content': f'{post.content[:110]}...' if len(post.content) > 110 else post.content[:110],
#             'category': post.category.name if post.category else "",
#             'created_at': post.created_at.strftime('%d %B %Y'),
#             'featured_image_url': post.featured_image.url if post.featured_image else "",
#             'author_name': post.author.username if post.author else None,
#             'readtime': post.readtime,
#             'views': post.views,
#             'author_image':"data:image/jpeg;base64,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"
#         }
#         data.append(post_data)

#     return JsonResponse({'recent_posts': data})
    


 # from django.shortcuts import render
 

 
# def get_recent_posts(request):
#     # Retrieve all objects from your model
#     queryset = BlogPost.objects.all()

#     # Number of items to display per page
#     items_per_page = 10
#     paginator = Paginator(queryset, items_per_page)

#     # Get the current page number from the request's GET parameters
#     page = request.GET.get('page')

#     try:
#         # Get the specified page
#         objects = paginator.page(page)
#     except PageNotAnInteger:
#         # If the page parameter is not an integer, show the first page
#         objects = paginator.page(1)
#     except EmptyPage:
#         # If the page is out of range (e.g., 9999), deliver the last page
#         objects = paginator.page(paginator.num_pages)

#     return render(request, 'post.html', {'objects': objects})



def get_top_users_with_max_post_views(request):
         
        profiles = Profile.objects.all()

        sorted_profiles = sorted(profiles, key=attrgetter('total_views'), reverse=True)[:3]
      
        serialized_data = []
 
        for profile in sorted_profiles:
            user_info = {'username': profile.user.username, 'about_me':profile.about_me,
                        'profession':profile.profession,
                        'facebook_url':profile.facebook_url,
                        'twitter_url':profile.twitter_url,
                        'insta_url':profile.instagram_url,
                        'author_image':profile.avatar.url,
                        }
            serialized_data.append(user_info)

        return JsonResponse({'data':serialized_data})

        
     
   



def get_all_categories(request):
    categories = Category.objects.all()[:7]
    data=[]
    
    for category in categories:
        category_data = {
         
            'name': category.name,
            'posts_on_categories': str(category.blogpost_set.all().count()).zfill(2)
         }
        data.append(category_data)

    return JsonResponse({'categories': data})


def todays_update(request):
    today = timezone.now().date()
    total_visitors = Visitor.objects.filter(visit_time__date=today).count()
    todays_posts=BlogPost.objects.filter(created_at__date=today).count()
    todays_subscribers = Subscriber.objects.filter(created__date=today).count()
    
    todays_view= View.objects.filter(created__date=today)
    
    total_blog_read_today = 0

    for view in todays_view:
        total_blog_read_today += view.post.readtime_without_min
        # print("sec",view.post.readtime_in_sec)


    data = {
        'total_visitors':total_visitors,
        'todays_posts':todays_posts,
        'new_subscribers':todays_subscribers,
        'blog_read':total_blog_read_today

    }
   

    return JsonResponse({'data': data})

 
def get_all_insta_posts(request):
    insta_posts = InstaPost.objects.all()[:9]
    data=[]
    
    for post in insta_posts:
        insta_data = {
            'id':post.id,
            'insta_image': post.insta_image.url,
            'insta_url': post.insta_url
         }
        data.append(insta_data)

    return JsonResponse({'insta_posts': data})



def get_all_tags(request):
    tags = Tag.objects.all()[:9]
    data=[]
    
    for tag in tags:
        tag_data = {
            'id':tag.id,
            'name': tag.name,
           
         }
        data.append(tag_data)

    return JsonResponse({'tags': data})


def post_by_categories(request, category_name):
    category= Category.objects.filter(name=category_name).first()

    if not category:
        return render(request, 'not_found.html', {"message":"the category you are looking for does not exist!"})


    return render (request, "posts_by_categories.html")
 



def post_by_categories_data(request,dyna_visible_categories, category_name):
    print("category_name,", category_name)
    visible = 8
    upper = dyna_visible_categories
    lower = upper-visible
 
    category= Category.objects.filter(name=category_name).first()
    
    if not category:
        return  JsonResponse({"data":"Category does not exists"})

    # if not category:
    #     return render(request, 'not_found.html', {"message":"the category you are looking for does not exist!"})
        

    posts_by_categories=category.blogpost_set.all()
   
    data=[]
     
    for post in posts_by_categories:
        post_data = {
            "id":post.id,
            'title': post.title[:40],
            'content': f'{post.content[:150]}...' if len(post.content) > 150 else post.content[:150],
            'category': post.category.name if post.category else "",
            # 'tags': [tag.name for tag in post.tags.all()],
            'created_at': post.created_at.strftime('%d %B %Y'),
            'featured_image_url': post.featured_image.url if post.featured_image else "",
            'author_name': post.author.username if post.author else None,
            'readtime': post.readtime,
            # 'views': post.views,
            'author_image':post.author.profile.avatar.url,
            'slug': post.slug,
        }
    
        data.append(post_data)
   
    return JsonResponse({"data":data[lower:upper],"size":posts_by_categories.count()})



def post_by_tags(request, tag_name):
    tag= Tag.objects.filter(name=tag_name).first()
 
    if not tag:
        return render(request, 'not_found.html', {"message":"the tag you are looking for does not exist!"})


    return render (request, "posts_by_tags.html")
 



def post_by_tags_data(request, dyna_visible_tags, tag_name):
    print("tag_name,", tag_name)
    visible = 8
    upper = dyna_visible_tags
    lower = upper-visible
 
    tag= Tag.objects.filter(name=tag_name).first()
    
    if not tag:
        return  JsonResponse({"data":"tag does not exists"})

    # if not category:
    #     return render(request, 'not_found.html', {"message":"the category you are looking for does not exist!"})
        

    posts_by_tags=tag.blogpost_set.all()
   
    data=[]
     
    for post in posts_by_tags:
        post_data = {
            "id":post.id,
            'title': post.title[:40],
            'content': f'{post.content[:150]}...' if len(post.content) > 150 else post.content[:150],
            'category': post.category.name if post.category else "",
            # 'tags': [tag.name for tag in post.tags.all()],
            'created_at': post.created_at.strftime('%d %B %Y'),
            'featured_image_url': post.featured_image.url if post.featured_image else "",
            'author_name': post.author.username if post.author else None,
            'readtime': post.readtime,
            # 'views': post.views,
            'author_image':post.author.profile.avatar.url,
            'slug':post.slug
        }
    
        data.append(post_data)
   
    return JsonResponse({"data":data[lower:upper],"size":posts_by_tags.count()})



 
 
def post_by_search_data(request, dyna_visible_search, search_keyword):
    search_keyword=search_keyword.strip() 
    print("search_keyword", search_keyword)
    visible = 8
    upper = dyna_visible_search
    lower = upper-visible
    if  search_keyword.lower() == "null" or search_keyword == "":
        return JsonResponse({"data":"Please write something to search."})
    
    search_result = BlogPost.objects.filter(
        Q(title__icontains=search_keyword) |       
        Q(content__icontains=search_keyword) |     
        Q(tags__name__icontains=search_keyword) |   
        Q(category__name__icontains=search_keyword)  
    ).distinct()
    
    if not search_result:
        return  JsonResponse({"data":"no posts found"})
     
   
    data=[]
     
    for post in search_result:
        post_data = {
            "id":post.id,
            'title': post.title[:40],
            'content': f'{post.content[:150]}...' if len(post.content) > 150 else post.content[:150],
            'category': post.category.name if post.category else "",
            # 'tags': [tag.name for tag in post.tags.all()],
            'created_at': post.created_at.strftime('%d %B %Y'),
            'featured_image_url': post.featured_image.url if post.featured_image else "",
            'author_name': post.author.username if post.author else None,
            'readtime': post.readtime,
            # 'views': post.views,
            'author_image':post.author.profile.avatar.url,
            'slug':post.slug
        }
    
        data.append(post_data)
   
    return JsonResponse({"data":data[lower:upper],"size":search_result.count()})



def post_detail(request, slug):
    post= BlogPost.objects.filter(slug=slug).first()

    if not post:
        return render(request, 'not_found.html', {"message":"the post you are looking for does not exist!"})

    
    return render (request, "post_detail.html")


def post_detail_data(request,slug):

    post_qs= BlogPost.objects.filter(slug=slug)
    
    if not post_qs:
        return  JsonResponse({"data":"post does not exist"})
    
    View.objects.create(post=post_qs.first())
     
    data1=[]

    for post in post_qs:
        post_data = {
            "id":post.id,
            'title': post.title,
            'content': post.content,
            'category': post.category.name if post.category else "",
            'tags': [tag.name for tag in post.tags.all()],
            'created_at': post.created_at.strftime('%d %B %Y'),
            'featured_image_url': post.featured_image.url if post.featured_image else "",
            'author_name': post.author.username if post.author else None,
            'readtime': post.readtime,
            # 'views': post.views,
            'author_image':post.author.profile.avatar.url
        }

    data1.append(post_data)

    data2=[]
     
    for related_post in post_qs.first().related_posts.all()[:2]:
        post_data = {
            "id":related_post.id,
            'title': related_post.title[:40],
            'content': f'{related_post.content[:90]}...' if len(related_post.content) > 90 else related_post.content[:90],
            'category': related_post.category.name if related_post.category else "",
            # 'tags': [tag.name for tag in post.tags.all()],
            'created_at': related_post.created_at.strftime('%d %B %Y'),
            'featured_image_url': related_post.featured_image.url if related_post.featured_image else "",
            'author_name': related_post.author.username if related_post.author else None,
            'readtime': related_post.readtime,
            # 'views': post.views,
            'author_image':related_post.author.profile.avatar.url,
            'slug':related_post.slug
        }
    
        data2.append(post_data)
   
    return JsonResponse({"data1":data1, "data2":data2 ,"size":post.related_posts.all().count()})
    
