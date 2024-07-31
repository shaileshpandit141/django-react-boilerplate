"""
URL configuration for suer_auth app.
"""

from django.urls import path, include
from .views import CustomTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView
from .views import RegisterView, UserView

urlpatterns = [
    path("api/token/", CustomTokenObtainPairView.as_view()),
    path("api/token/refresh/", TokenRefreshView.as_view()),
    path("api/register/", RegisterView.as_view()),
    path("api/user/<int:user_id>/", UserView.as_view()),
]
