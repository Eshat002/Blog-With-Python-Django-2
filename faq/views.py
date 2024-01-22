from django.shortcuts import render
from .models import FAQ
from django.http import JsonResponse

def faq(request):
    return render(request, "faq.html")


def faq_data(request):
    faqs = FAQ.objects.all()[:5]
    data=[]
    
    for faq in faqs:
        faq_data = {
            'question':faq.question,
            'answer': faq.answer,
            'id':faq.id
           
         }
        data.append(faq_data)

    return JsonResponse({'faq': data})