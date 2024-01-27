from django.db import models
from readtime import of_html
from django.core.validators import FileExtensionValidator
from django.contrib.auth.models import User   
from django.utils import timezone
from django.core.validators import URLValidator
# from ckeditor_uploader.fields import RichTextUploadingField
# from django_quill.fields import QuillField
from ckeditor.fields import RichTextField
from django.utils.text import slugify



class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name
    class Meta:
        ordering = ['-id']
        
class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)

    
    class Meta:
        ordering = ['-id']

    def __str__(self):
        return self.name
    


class BlogPost(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE) 
    title = models.CharField(max_length=200, null=False, blank=False)
    content = RichTextField(null=False, blank=False)
    category = models.ForeignKey(Category, on_delete=models.CASCADE,null=True)
    tags = models.ManyToManyField(Tag, blank=True)
    featured_image = models.ImageField(upload_to='featured_images/', default='featured_images/default_image.png', validators=[
                              FileExtensionValidator(['png', 'jpg', 'jpeg', 'gif'])], blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_featured= models.BooleanField(default=False)
    views = models.PositiveIntegerField(default=0)
    banner_after_me=models.BooleanField(default=False)
    slug = models.SlugField(max_length=255, unique=True, blank=True, null=False)
    related_posts= models.ManyToManyField("self", blank=True)


    def save(self, *args, **kwargs):
        if not self.slug:
            # Generate a unique slug based on the title
            self.slug = slugify(self.title)

            # Ensure slug is unique
            original_slug = self.slug
            count = 1
            while BlogPost.objects.filter(slug=self.slug).exists():
                self.slug = f"{original_slug}-{count}"
                count += 1

        super().save(*args, **kwargs)


    class Meta:
        ordering = ['-id']

    @property
    def readtime(self):
        result = of_html(self.content)
        return result.text
       

    def __str__(self):
        return self.title


class InstaPost(models.Model):
    
    insta_image = models.ImageField(upload_to='insta_images/', default='insta_images/default_insta_image.png', validators=[
                              FileExtensionValidator(['png', 'jpg', 'jpeg', 'gif'])], blank=True, null=True)
    insta_url = models.URLField(validators=[URLValidator()], blank=True, null=True)



    class Meta:
        ordering = ['-id']

    
