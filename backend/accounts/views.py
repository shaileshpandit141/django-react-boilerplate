from django.utils import timezone
from django.contrib.auth.models import update_last_login
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from allauth.account.utils import send_email_confirmation
from rest_framework.throttling import UserRateThrottle, AnonRateThrottle
from .serializers import UserSerializer
from dj_rest_auth.views import PasswordResetView

User = get_user_model()


class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)

        try:
            serializer.is_valid(raise_exception=True)
        except Exception as e:
            return Response(
                {"non_field_errors": [str(e)]}, status=status.HTTP_400_BAD_REQUEST
            )

        user = serializer.user

        # Check if the user is active
        if not user.is_active:
            return Response(
                {"account_status": [_("This account is not active.")]},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        # If the user is not a superuser, check for email verification
        if not user.is_superuser:
            if not user.emailaddress_set.filter(verified=True).exists():
                return Response(
                    {"verification_error": [_("This account is not verified.")]},
                    status=status.HTTP_401_UNAUTHORIZED,
                )

        # Update the last_login field manually
        user.last_login = timezone.now()
        user.save(update_fields=["last_login"])

        # If all checks pass, generate tokens
        refresh = RefreshToken.for_user(user)

        return Response(
            {
                "refresh": str(refresh),
                "access": str(refresh.access_token),
            },
            status=status.HTTP_200_OK,
        )


class ResendVerificationEmailView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username", None)

        if not username:
            return Response(
                {"username": ["This field may not be blank."]},
                status=status.HTTP_400_BAD_REQUEST,
            )

        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response(
                {"username": ["User with this username does not exist."]},
                status=status.HTTP_404_NOT_FOUND,
            )

        # Check if email is already verified
        if user.emailaddress_set.filter(email=user.email, verified=False).exists():
            send_email_confirmation(request, user)
            return Response(
                {"detail": "Account verification e-mail has been sent."},
                status=status.HTTP_200_OK,
            )
        else:
            return Response(
                {"detail": "This account is already verified."},
                status=status.HTTP_400_BAD_REQUEST,
            )


# Define a custom reset view
class CustomPasswordResetView(PasswordResetView):
    def post(self, request, *args, **kwargs):
        email = request.data.get("email")
        if not email:
            return Response({"error": ["Email is required."]}, status=400)

        # Check if the email exists in the User model
        if not User.objects.filter(email=email).exists():
            return Response(
                {"email": ["This email address does not exist."]}, status=404
            )

        # Proceed with the default behavior if email exists
        return super().post(request, *args, **kwargs)


class UserInfoView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]
    throttle_classes = [UserRateThrottle, AnonRateThrottle]

    def get(self, request):
        return Response({"message": "This is a protected view"})
