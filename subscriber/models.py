from django.db import models

class Subscriber(models.Model):
    email= models.EmailField(null=True, blank=True, unique=True)
    created=models.DateTimeField(auto_now_add=True)