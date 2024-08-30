from django.template.loader import render_to_string
from django.core.mail import send_mail
from allauth.account.adapter import DefaultAccountAdapter
from django.conf import settings
from decouple import config, Csv


class CustomAccountAdapter(DefaultAccountAdapter):
    def send_confirmation_mail(self, request, emailconfirmation, signup):
        # Change the URL to point to your frontend

        CORS_ALLOWED_ORIGINS = config("CORS_ALLOWED_ORIGINS", cast=Csv())

        list_of_activate_url = [""]

        for domain_name_protocal in CORS_ALLOWED_ORIGINS:
            domain_name = (domain_name_protocal.split("/")[2]).split(":")[0]
            list_of_activate_url.append(
                f"{domain_name}:    {domain_name_protocal}/verify-account/{emailconfirmation.key}/"
            )

        # f"http://localhost:3000/verify-account/{emailconfirmation.key}/"

        activate_url = "\n\n".join(list_of_activate_url)

        # Prepare context for the email template
        ctx = {
            "user": emailconfirmation.email_address.user,
            "activate_url": activate_url,
            "current_site": request.get_host(),
            "key": emailconfirmation.key,
        }

        # Render the email template
        email_template_name = "account/email/email_confirmation_message.txt"
        # Update this as needed
        subject = "Confirm your email address"  
        message = render_to_string(email_template_name, ctx)

        # Send the email
        send_mail(
            subject,
            message,
            # Or another email address from which you want to send
            settings.DEFAULT_FROM_EMAIL,
            [emailconfirmation.email_address.email],
            fail_silently=False,
        )
