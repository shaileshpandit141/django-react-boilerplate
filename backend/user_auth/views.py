from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics
from rest_framework import status
from .models import CustomUser
from .serializers import CustomTokenObtainPairSerializer
from .serializers import RegisterSerializer, CustomUserSerializer

# Import email and password validator.
from .utils.email_validator import validate_email
from .utils.password_validator import validate_password


# Create your views here.
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        data = request.data

        email = data.get("email")
        password = data.get("password")
        confirm_password = data.get("confirm_password")

        if email is None:
            return Response(
                {
                    "email": {
                        "error_message": "email field is not provide in request data.",
                        "help_text": ["Please enter a valid email address."],
                    }
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        else:
            if not validate_email(email):
                return Response(
                    {
                        "email": {
                            "error_message": "Invalid email address.",
                            "help_text": ["Please enter a valid email address."],
                        }
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

        if password is None:
            return Response(
                {
                    "password": {
                        "error_message": "password field is not provide in request data.",
                        "help_text": ["Password must not be blank."],
                    }
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        else:
            if not validate_password(password):
                return Response(
                    {
                        "password": {
                            "error_message": "Invalid password.",
                            "help_text": [
                                "Is at least 8 characters long.",
                                "Contains at least one uppercase letter.",
                                "Contains at least one lowercase letter.",
                                "Contains at least one number.",
                                "Contains at least one special character.",
                            ],
                        }
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

        if confirm_password is None:
            return Response(
                {
                    "confirm_password": {
                        "error_message": "confirm_password field is not provide in request data.",
                        "help_text": ["Confirm Password must not be blank."],
                    }
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        else:
            if not validate_password(confirm_password):
                return Response(
                    {
                        "confirm_password": {
                            "error_message": "Invalid confirm password.",
                            "help_text": [
                                "Is at least 8 characters long.",
                                "Contains at least one uppercase letter.",
                                "Contains at least one lowercase letter.",
                                "Contains at least one number.",
                                "Contains at least one special character.",
                            ],
                        }
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )

        if password != confirm_password:
            return Response(
                {
                    "confirm_password": {
                        "error_message": "Password is not equal to confirm password.",
                        "help_text": ["Please enter a confirmation password like Password."],
                    }
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        else:
            user_exists = CustomUser.objects.filter(email=email).exists()
            if user_exists:
                return Response(
                    {
                        "email": {
                            "error_message": "Enter email already exists, try with another email.",
                            "help_text": [
                                "Please enter a new email address which is not registered."
                            ],
                        }
                    },
                    status=status.HTTP_400_BAD_REQUEST,
                )
            else:
                serializer = self.get_serializer(data=request.data)
                serializer.is_valid(raise_exception=True)
                self.perform_create(serializer)

                user = CustomUser.objects.get(email=serializer.data["email"])
                refresh = RefreshToken.for_user(user)

                response_data = serializer.data
                response_data["refresh"] = str(refresh)
                response_data["access"] = str(refresh.access_token)

                headers = self.get_success_headers(serializer.data)
                return Response(
                    response_data, status=status.HTTP_201_CREATED, headers=headers
                )


class UserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user_id = kwargs.get("user_id")
        try:
            serializeUser = CustomUserSerializer(CustomUser.objects.get(id=user_id))
            return Response(serializeUser.data, status=status.HTTP_200_OK)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
