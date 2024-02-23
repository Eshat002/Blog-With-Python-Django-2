from decouple import config
from pathlib import Path
import dj_database_url
# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = config("SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = config("DEBUG", cast=bool)

ALLOWED_HOSTS = ['*']


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'post',
    'profiles',
    'ad',
    'subscriber',
    'faq',
    # 'django_quill',
    'ckeditor',
    # 'ckeditor_uploader'
    'django_social_share',
    'storages',



 
]

CKEDITOR_UPLOAD_PATH = "uploads/"
CKEDITOR_CONFIGS = {
    'default': {
        'toolbar': 'full',
        # 'height': 300,
        # 'width': 300,
    },
}

# CKEDITOR_BASEPATH = "/static/ckeditor/ckeditor/"



MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'main.middleware.UniqueVisitorMiddleware',


]
 



ROOT_URLCONF = 'main.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR / 'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'main.wsgi.application'


# Database
# https://docs.djangoproject.com/en/5.0/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}


# DATABASES = {
#     'default': {
#         'ENGINE': config('ENGINE'),
#         'NAME': config('NAME'),
#         'USER':  config('USER'),
#         'PASSWORD': config('PASSWORD'),
#         'HOST': config('HOST'),  # Or your MySQL server's IP address
#         'PORT': config('PORT')       # Default MySQL port
#     }
# }


# DATABASES = {
#     'default': dj_database_url.parse(config("mysql_uri"))
# }
 

# Password validation
# https://docs.djangoproject.com/en/5.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.0/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.0/howto/static-files/

STATIC_URL = '/static/'
STATICFILES_DIRS = [BASE_DIR / 'static']
STATIC_ROOT = BASE_DIR / 'static_root'

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media_root'

# Default primary key field type
# https://docs.djangoproject.com/en/5.0/ref/settings/#default-auto-field


# accessing aws and s3 bucket
# DEFAULT_FILE_STORAGE= "storages.backends.s3boto3.S3Boto3Storage"
# STATICFILES_STORAGE="storages.backends.s3boto3.S3StaticStorage"
# AWS_ACCESS_KEY_ID=config("AWS_ACCESS_KEY_ID")

# AWS_SECRET_ACCESS_KEY= config("AWS_SECRET_ACCESS_KEY")
# AWS_STORAGE_BUCKET_NAME=config("AWS_STORAGE_BUCKET_NAME")
# AWS_QUERYSTRING_AUTH= config("AWS_QUERYSTRING_AUTH", cast=bool)  

# AWS_DEFAULT_ACL= None




# sending email
EMAIL_BACKEND = config('EMAIL_BACKEND')
EMAIL_HOST = config('EMAIL_HOST')
EMAIL_PORT = config('EMAIL_PORT', cast=int)
EMAIL_HOST_USER = config('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = config('EMAIL_HOST_PASSWORD')
EMAIL_USE_TLS = config('EMAIL_USE_TLS')
# DEFAULT_FROM_EMAIL = Address(
#     display_name="Promodtori", addr_spec="eshat@promodtori.com")

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'






 #calculating amout of data in dbsqlite3

# import os
 
# def get_database_size():
#     db_file = BASE_DIR / 'db.sqlite3' # Replace this with the path to your SQLite database file
#     if os.path.exists(db_file):
#         # Get the size of the file in bytes
#         size_in_bytes = os.path.getsize(db_file)
#         # Convert bytes to megabytes
#         size_in_mb = size_in_bytes / (1024 * 1024)
#         return size_in_mb
#     else:
#         return None

# # Example usage
# db_size_mb = get_database_size()
# if db_size_mb is not None:
#     print(f"The size of the database is approximately {db_size_mb:.2f} MB.")
# else:
#     print("Database file not found.")