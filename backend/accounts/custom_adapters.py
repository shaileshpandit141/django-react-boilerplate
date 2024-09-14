from django.template.loader import render_to_string
from django.core.mail import send_mail
from allauth.account.adapter import DefaultAccountAdapter
from django.conf import settings
from decouple import config


class CustomAccountAdapter(DefaultAccountAdapter):

    # Override send_confirmation_mail for email verification
    def send_confirmation_mail(self, request, emailconfirmation, signup):
        # Change the URL to point to your frontend
        HOST = config("SEND_VERIFICATION_URL_HOST", cast=str, default="localhost")
        PORT = config("SEND_VERIFICATION_URL_PORT", cast=str, default="3000")

        activate_url = f"http://{HOST}:{PORT}/verify-account/{emailconfirmation.key}/"

        # Prepare context for the email template
        ctx = {
            "user": emailconfirmation.email_address.user,
            "activate_url": activate_url,
            "current_site": request.get_host(),
            "key": emailconfirmation.key,
        }

        # Render the email template
        email_template_name = "account/email/email_confirmation_message.txt"
        subject = "Confirm your email address"
        message = render_to_string(email_template_name, ctx)

        # Send the email
        send_mail(
            subject,
            message,
            settings.DEFAULT_FROM_EMAIL,
            [emailconfirmation.email_address.email],
            fail_silently=False,
        )

    # Override send_mail for password reset customization
    def send_mail(self, template_prefix, email, context):
        if "uid" in context and "token" in context:
            # Customize password reset URL to point to your frontend
            HOST = config("SEND_VERIFICATION_URL_HOST", cast=str, default="localhost")
            PORT = config("SEND_VERIFICATION_URL_PORT", cast=str, default="3000")

            password_reset_url = f"http://{HOST}:{PORT}/password-reset-confirm/{context['uid']}/{context['token']}/"
            
            context["password_reset_url"] = password_reset_url

        # Call the parent class method to handle the actual sending of the email
        super().send_mail(template_prefix, email, context)
