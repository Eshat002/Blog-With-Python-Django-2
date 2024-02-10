from django.shortcuts import render
from django.http import JsonResponse,HttpResponse
from django.views import View
import json
from django.core.mail import EmailMessage
from django.core.validators import validate_email
from django.core.exceptions import ValidationError



class send_message_view(View):
    def post(self, request, *args, **kwargs):
        try:
            form_data = json.loads(request.body)  # Parse JSON data
            print("data",form_data)
            name=form_data.get("name")
            email=form_data.get("email")
            body=form_data.get("message")
            to_email=["eshatjubayer22@outlook.com"]
            subject=form_data.get("subject")

            if not body or not email: 
                return JsonResponse({"data": "Email and Message can not be empty."})
            
            try:
                validate_email(email)                   
            
            except ValidationError as e:
                print("e",e)
                return JsonResponse({"data":"Email is not valid."})
            
            
            print("validated")
           
            subject = subject
            body = body
            to_email = to_email
            from_email = "nolanvenus33@gmail.com"
            email = EmailMessage(subject, body, from_email, to_email)
            email.send()
            print("not prevented")
          

            response_data = {'data': 'Form has been submitted.'}
            return JsonResponse(response_data)

        except json.JSONDecodeError as e:
            return JsonResponse({'error': 'Invalid JSON format'}, status=400)




       