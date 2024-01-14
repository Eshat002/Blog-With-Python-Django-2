from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static
from subscriber import views
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('post.urls')),
    path('profiles/', include('profiles.urls')),
    path('ad/', include('ad.urls')),
    path('subscribe/', views.subscribe),
    path('write-blog/', TemplateView.as_view(template_name='write_blog.html')),
    path('about-us/', TemplateView.as_view(template_name='about_us.html')),
    path('contact/', TemplateView.as_view(template_name='contact.html')),



]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)