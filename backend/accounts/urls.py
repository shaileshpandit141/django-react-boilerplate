"""
URL configuration for accounts app.
"""

from django.urls import path, include
from rest_framework_simplejwt.views import TokenRefreshView
from django.contrib.auth import views as auth_views
from .views import (
    CustomTokenObtainPairView,
    ResendVerificationEmailView,
    UserInfoView,
    ProtectedView,
)


urlpatterns = [
    path("", include("dj_rest_auth.urls")),
    path(
        "password-reset-confirm/<uidb64>/<token>/",
        auth_views.PasswordResetConfirmView.as_view(),
        name="password_reset_confirm",
    ),
    path(
        "resend-verification/",
        ResendVerificationEmailView.as_view(),
        name="resend_verification",
    ),
    path("signup/", include("dj_rest_auth.registration.urls")),
    path("token/", CustomTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("user/", UserInfoView.as_view(), name="user"),
    path("protected/", ProtectedView.as_view(), name="protected"),
]
