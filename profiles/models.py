from django.db import models
from django.contrib.auth.models import User
from django.core.validators import FileExtensionValidator
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.core.validators import URLValidator
from django.core.exceptions import ValidationError
from django.utils import timezone
from django.db.models import Sum
from post.models import BlogPost


class Visitor(models.Model):
    identifier = models.CharField(max_length=255, unique=True)
    visit_time = models.DateTimeField(default=timezone.now)


    
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.ImageField(default='avatars/avatar.png', upload_to='avatars',validators=[
                              FileExtensionValidator(['png', 'jpg', 'jpeg', 'gif'])])
    profession = models.CharField(max_length=50, null=True, blank=True)
    about_me = models.CharField(max_length=300, null=True, blank=True)
    facebook_url = models.URLField(validators=[URLValidator()], blank=True, null=True)
    twitter_url = models.URLField(validators=[URLValidator()], blank=True, null=True)
    instagram_url = models.URLField(validators=[URLValidator()], blank=True, null=True)


    class Meta:
        ordering= ["-id"]

    @property
    def total_views(self):
    # Get all the blog posts associated with the user
        user_blog_posts = BlogPost.objects.filter(author=self.user)

        # Calculate the total views by summing up views for each blog post
        total_views = sum(post.view_set.all().count() for post in user_blog_posts)

        return total_views

    def __str__(self):
        total_views = self.total_views
        return f"profile-{self.user.username}-total views {total_views}"
    



@receiver(post_save, sender=User)
def post_save_create_profile(sender, instance, created, *args, **kwargs):
    if created:
        Profile.objects.create(user=instance)
        