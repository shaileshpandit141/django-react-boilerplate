"""
URL configuration for server project.
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from user_auth import urls as user_auth

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/auth/", include(user_auth)),
]

# Allows the application to know what folder to access on the server side when receiving a request from the MEDIA_URL.
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
