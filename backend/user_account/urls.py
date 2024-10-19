"""
URL configuration for accounts app.
"""

from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
from dj_rest_auth.views import PasswordResetConfirmView
from django.urls import path, include
from .views import (
    CustomPasswordResetView,
    ResendVerificationEmailView,
    CustomSignoutView,
    CustomTokenObtainPairView,
    UserInfoView,
    ProtectedView,
)

urlpatterns = [
    # Authentication-related endpoints
    path("signup/", include("dj_rest_auth.registration.urls")),
    path("signout/", CustomSignoutView.as_view(), name="custom_logout"),
    path("resend-verification/", ResendVerificationEmailView.as_view(), name="resend_verification"),

    # Password management
    path("password/reset/", CustomPasswordResetView.as_view(), name="password_reset"),
    path("password/reset/confirm/", PasswordResetConfirmView.as_view(), name="password_reset_confirm"),
    path("password/reset/confirm/<uidb64>/<token>/", PasswordResetConfirmView.as_view(), name="password_reset_confirm"),

    # Token management
    path("token/", CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

    # User info and protected routes
    path("user/", UserInfoView.as_view(), name="user"),
    path("protected/", ProtectedView.as_view(), name="protected"),
]
