from allauth.account.adapter import DefaultAccountAdapter
from django.conf import settings


class CustomAccountAdapter(DefaultAccountAdapter):
    def send_confirmation_mail(self, request, emailconfirmation, signup):
        # Change the URL to point to your frontend
        activate_url = f"http://localhost:3000/api/auth/registration/verify-email/{emailconfirmation.key}/"
        ctx = {
            "user": emailconfirmation.email_address.user,
            "activate_url": activate_url,
            "current_site": request.get_host(),
            "key": emailconfirmation.key,
        }
        email_template = "account/email/email_confirmation"
        self.send_mail(email_template, emailconfirmation.email_address.email, ctx)
