"""
URL configuration for server project.
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.conf.urls import handler404
from .views import custom_404_view, IndexTemplateView
from user_account import urls


urlpatterns = [
    path("", IndexTemplateView.as_view()),
    path("admin/", admin.site.urls),
    path("api/auth/", include(urls)),
]

# Setting the custom_404_view Handler.
handler404 = custom_404_view

# Allows the application to know what folder to access on the server side when receiving a request from the MEDIA_URL.
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
