"""
URL configuration for suer_auth app.
"""

from django.urls import path, include
from .views import CustomTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView
from .views import Message, RegisterView

urlpatterns = [
    path("message/", Message.as_view(), name="hello_world"),
    path("api/token/", CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/register/", RegisterView.as_view()),
]
