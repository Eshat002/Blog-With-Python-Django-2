# Generated by Django 5.0 on 2024-01-01 13:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ad', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='ad',
            name='show',
            field=models.BooleanField(default=True),
        ),
    ]