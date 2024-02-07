from django.shortcuts import render
from .models import Ad
from django.http import JsonResponse
# Create your views here.

def ad(request):
    ad=Ad.objects.all().first()
    if not ad:
        return JsonResponse({"data":"No ad exists"})
    
    # data=[]
    # for ad in ads:
    data = {
        'title': ad.title,
        'des':ad.des,
        'ad_url':ad.ad_url,
        'show':ad.show
    }
     

    return JsonResponse({'data': data})
    