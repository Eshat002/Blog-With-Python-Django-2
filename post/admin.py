from django.contrib import admin
from .models import *

admin.site.register(BlogPost)
admin.site.register(InstaPost)
admin.site.register(Category)
admin.site.register(Tag)
admin.site.register(View)
