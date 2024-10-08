from rest_framework import serializers
from django.utils.translation import gettext_lazy as _
from django.conf import settings
from django.contrib.auth import get_user_model

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "first_name", "last_name"]
