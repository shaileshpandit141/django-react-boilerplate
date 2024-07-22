from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import CustomTokenObtainPairSerializer
from .serializers import RegisterSerializer
from rest_framework import generics
from rest_framework import status
from .models import CustomUser


# Create your views here.

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class RegisterView(generics.CreateAPIView):
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        user = CustomUser.objects.get(email=serializer.data["email"])
        refresh = RefreshToken.for_user(user)

        response_data = serializer.data
        response_data["refresh"] = str(refresh)
        response_data["access"] = str(refresh.access_token)

        headers = self.get_success_headers(serializer.data)
        return Response(response_data, status=status.HTTP_201_CREATED, headers=headers)


class Message(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"message": "Hello, World!"}, status=status.HTTP_200_OK)
