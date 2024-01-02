from django.db import models
from django.core.validators import URLValidator

class Ad(models.Model):
    title=models.CharField(max_length=100)
    des=models.CharField(max_length=300)
    ad_url = models.URLField(validators=[URLValidator()], blank=True, null=True)
    show=models.BooleanField(default=True)

    def __str__(self):
        return self.title
    
    class Meta:
        ordering = ['-id']
     