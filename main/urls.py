from django.contrib import admin
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static
from subscriber.views import subscribe
from django.views.generic import TemplateView
from .views import send_message_view
 
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('post.urls')),
    path('profiles/', include('profiles.urls')),
    path('ad/', include('ad.urls')),
    path('subscribe/', subscribe),
    path('write-blog/', TemplateView.as_view(template_name='write_blog.html')),
    path('about-us/', TemplateView.as_view(template_name='about_us.html')),
    path('contact/', TemplateView.as_view(template_name='contact.html')),
    path('send-message-form/', send_message_view.as_view()),
    path('faq/', include("faq.urls")),
    path('tos/', TemplateView.as_view(template_name='tos.html')),
    path('privacy-policy/', TemplateView.as_view(template_name='pp.html')),
    path('support/', TemplateView.as_view(template_name='support.html')),

    # path('ckeditor/', include('ckeditor_uploader.urls')),


]


urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)