from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import AccessToken
from django.contrib.auth import get_user_model
from allauth.account.utils import send_email_confirmation
from rest_framework.throttling import UserRateThrottle, AnonRateThrottle


User = get_user_model()


class ResendVerificationEmailView(APIView):

    # Ensure the user is authenticated
    permission_classes = [IsAuthenticated]

    def post(self, request):
        token = request.headers.get("Authorization", None)

        if not token or not token.startswith("Bearer "):
            return Response(
                {"detail": "Authorization header missing or malformed"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        # Extract the token from the Bearer header
        token = token.split(" ")[1]

        user = self.get_user_from_token(token)
        if not user:
            return Response(
                {"detail": "Invalid or expired token"},
                status=status.HTTP_401_UNAUTHORIZED,
            )

        # Check if email is already verified
        if user.emailaddress_set.filter(email=user.email, verified=False).exists():
            send_email_confirmation(request, user)
            return Response(
                {"detail": "Verification e-mail sent"}, status=status.HTTP_200_OK
            )
        else:
            return Response(
                {"detail": "Email already verified"},
                status=status.HTTP_400_BAD_REQUEST,
            )

    def get_user_from_token(self, token):
        """
        Decode the JWT token and return the user.
        """
        try:
            access_token = AccessToken(token)
            user_id = access_token["user_id"]
            user = User.objects.get(id=user_id)
            return user
        except Exception:
            return None


class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]
    throttle_classes = [UserRateThrottle, AnonRateThrottle]

    def get(self, request):
        return Response({"message": "This is a protected view"})
