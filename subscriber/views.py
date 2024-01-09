from django.shortcuts import render
from django.http import JsonResponse,HttpResponse
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from .models import Subscriber

 
def subscribe(request):
    if request.method == 'POST':
        email = request.POST.get('email')
       
        if not email:
            return JsonResponse({"data": "Email cannot be empty."})

        try:
            validate_email(email)
            subscriber, created= Subscriber.objects.get_or_create(email=email)
            if created:
               return JsonResponse({"data":"You are subscribed."})

            elif not created:
                return JsonResponse({"data":"You already subscribed."})               
            
        except ValidationError as e:
            print("e",e)
            return JsonResponse({"data":"Email is not valid."})
        
    return HttpResponse("Method may be different")