from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.utils import timezone
from django.contrib.auth.models import update_last_login
from django.utils.translation import gettext_lazy as _
from django.contrib.auth import get_user_model
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import AccessToken, RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from allauth.account.utils import send_email_confirmation
from rest_framework.throttling import UserRateThrottle, AnonRateThrottle
from .serializers import UserSerializer
from dj_rest_auth.views import PasswordResetView, LogoutView


User = get_user_model()


# Define a view for custom token obtain pair.
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


# Define a view for custom signout.
class CustomSignoutView(LogoutView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        # Extract refresh token from the request data
        refresh_token = request.data.get("refresh_token", None)

        if refresh_token is None:
            # If no refresh token is provided, return an error response
            return Response(
                {"refresh_token": ["This field cannot be blank."]},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # Try to invalidate the refresh token by blacklisting it
            token = RefreshToken(refresh_token)
            # Blacklist the refresh token in the database
            token.blacklist()
        except Exception as e:
            # If something goes wrong (e.g., Invalid Token), return a failure response
            return Response({"invalid_token": [str(e)]}, status=status.HTTP_400_BAD_REQUEST)

        # Proceed with session-based logout (if necessary, like django-allauth session logout)
        response = super().post(request, *args, **kwargs)

        # Return a custom response indicating successful logout and refresh token invalidation
        return Response({"detail": "Successfully sign out and refresh token blacklisted."}, status=status.HTTP_200_OK)


# Define a view for resend verification email.
class ResendVerificationEmailView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        # Extract username from the request data
        username = request.data.get("username", None)
        
        # Validate the username.
        if not username:
            return Response(
                {"username": ["This field cannot be blank."]},
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


# Define a custom reset view.
class CustomPasswordResetView(PasswordResetView):
    def post(self, request, *args, **kwargs):
        email = request.data.get("email")
        if not email:
            return Response({"email": ["This field cannot be blank."]}, status=400)

        # Check if the email exists in the User model
        if not User.objects.filter(email=email).exists():
            return Response(
                {"email": ["This email address does not exist."]}, status=404
            )

        # Proceed with the default behavior if email exists
        return super().post(request, *args, **kwargs)


# Define a view for user info.
class UserInfoView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


# Define a views for test proctected end point.
class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]
    throttle_classes = [UserRateThrottle, AnonRateThrottle]

    def get(self, request):
        return Response({"message": "This is a protected route."})
