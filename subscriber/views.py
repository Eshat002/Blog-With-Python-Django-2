from django.shortcuts import render
from django.http import JsonResponse,HttpResponse
from django.core.validators import validate_email
from django.core.exceptions import ValidationError


print("validatior", validate_email)
def subscribe(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        print("email", email)
        try:
            validate_email(email)
            return JsonResponse({"Email is valid":"yes"})
            # Email is valid, proceed with saving or further processing
        except ValidationError as e:
            # response_data = {'status': 'error', 'message': str(e)}  # Return a detailed error message
            # return JsonResponse(response_data, status=400)
            return JsonResponse({"Email is valid":"No"})
        
    return HttpResponse("Method may be different")