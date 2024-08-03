from rest_framework.views import APIView
from rest_framework.exceptions import ValidationError
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
            raise ValidationError(
                {
                    "email": {
                        "error": "email field is not provide in request data.",
                        "details": ["Please enter a valid email address."],
                    }
                }
            )
        else:
            if not validate_email(email):
                raise ValidationError(
                    {
                        "email": {
                            "error": "Invalid email address.",
                            "details": ["Please enter a valid email address."],
                        }
                    }
                )

        if password is None:
            raise ValidationError(
                {
                    "password": {
                        "error": "password field is not provide in request data.",
                        "details": ["Password must not be blank."],
                    }
                }
            )
        else:
            if not validate_password(password):
                raise ValidationError(
                    {
                        "password": {
                            "error": "Invalid password.",
                            "details": [
                                "Is at least 8 characters long.",
                                "Contains at least one uppercase letter.",
                                "Contains at least one lowercase letter.",
                                "Contains at least one number.",
                                "Contains at least one special character.",
                            ],
                        }
                    }
                )

        if confirm_password is None:
            raise ValidationError(
                {
                    "confirm_password": {
                        "error": "confirm_password field is not provide in request data.",
                        "details": ["Confirm Password must not be blank."],
                    }
                }
            )
        else:
            if not validate_password(confirm_password):
                raise ValidationError(
                    {
                        "confirm_password": {
                            "error": "Invalid confirm password.",
                            "details": [
                                "Is at least 8 characters long.",
                                "Contains at least one uppercase letter.",
                                "Contains at least one lowercase letter.",
                                "Contains at least one number.",
                                "Contains at least one special character.",
                            ],
                        }
                    }
                )

        if password != confirm_password:
            raise ValidationError(
                {
                    "confirm_password": {
                        "error": "Password is not equal to confirm password.",
                        "details": [
                            "Please enter a confirmation password like Password."
                        ],
                    }
                }
            )
        else:
            user_exists = CustomUser.objects.filter(email=email).exists()
            if user_exists:
                raise ValidationError(
                    {
                        "email": {
                            "error": "Enter email already exists, try with another email.",
                            "details": [
                                "Please enter a new email address which is not registered."
                            ],
                        }
                    }
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
