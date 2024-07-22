from django.contrib import admin
from rest_framework_simplejwt.token_blacklist.models import (
    OutstandingToken,
    BlacklistedToken,
)
from .models import CustomUser

# Register your models here.

admin.site.register(CustomUser)

# By Default is register ( By define the INSTALL_APP = ["rest_framework_simplejwt.token_blacklist",])

# @admin.register(OutstandingToken)
# class OutstandingTokenAdmin(admin.ModelAdmin):
#     list_display = ("jti", "user", "token", "created_at", "expires_at")


# @admin.register(BlacklistedToken)
# class BlacklistedTokenAdmin(admin.ModelAdmin):
#     list_display = ("token", "blacklisted_at")
