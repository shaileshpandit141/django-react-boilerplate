"""
URL configuration for accounts app.
"""

from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    CustomTokenObtainPairView,
    ResendVerificationEmailView,
    ProtectedView,
)


urlpatterns = [
    path("/", include("dj_rest_auth.urls")),
    path(
        "resend-verification/",
        ResendVerificationEmailView.as_view(),
        name="resend_verification",
    ),
    path("registration/", include("dj_rest_auth.registration.urls")),
    path("token/", CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("protected/", ProtectedView.as_view(), name="protected"),
]
