from rest_framework import serializers
from django.utils.translation import gettext_lazy as _
from django.conf import settings
from django.contrib.auth import get_user_model

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "email", "first_name", "last_name"]
        read_only_fields = ['id']
        extra_kwargs = {
            'id': {
                'read_only': True
            },
            'username': {
                'required': True,
                'error_messages': {
                    'required': 'username is required.',
                    'invalid': 'Invalid username.'
                }
            },
            'email': {
                'required': True,
                'error_messages': {
                    'required': 'email is required.',
                    'invalid': 'Invalid email.'
                }
            },
            'first_name': {
                'required': False,
                'error_messages': {
                    'invalid': 'Invalid first_name.'
                }
            },
            'last_name': {
                'required': False,
                'error_messages': {
                    'invalid': 'Invalid last_name.'
                }
            }
        }
