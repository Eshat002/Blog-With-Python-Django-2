from django.db import models
from readtime import of_html
from django.core.validators import FileExtensionValidator
from django.contrib.auth.models import User   



class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Tag(models.Model):
    name = models.CharField(max_length=50)

    def __str__(self):
        return self.name

class BlogPost(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE) 
    title = models.CharField(max_length=200)
    content = models.TextField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE,null=True)
    tags = models.ManyToManyField(Tag, blank=True, null=True)
    featured_image = models.ImageField(upload_to='featured_images/', default='featured_images/default_image.png', validators=[
                              FileExtensionValidator(['png', 'jpg', 'jpeg', 'gif'])], blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_featured= models.BooleanField(default=False)
    views = models.PositiveIntegerField(default=0)
    banner_after_me=models.BooleanField(default=False)


    class Meta:
        ordering = ['-id']

    @property
    def readtime(self):
        result = of_html(self.content)
        return result.text

    def __str__(self):
        return self.title


