from django.template.loader import render_to_string
from django.core.mail import EmailMultiAlternatives
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
        context = {
            "user": emailconfirmation.email_address.user,
            "activate_url": activate_url,
            "current_site": request.get_host(),
            "key": emailconfirmation.key,
        }

        # Render the plain text and HTML email templates
        email_template_txt = "user_account/email/email_confirmation_message.txt"
        email_template_html = "user_account/email/email_confirmation_message.html"

        subject = "Confirm your email address"
        message_txt = render_to_string(email_template_txt, context)
        message_html = render_to_string(email_template_html, context)

        # Create the multi-part email object
        email = EmailMultiAlternatives(
            subject,
            message_txt,
            settings.DEFAULT_FROM_EMAIL,
            [emailconfirmation.email_address.email],
        )

        # Attach the HTML version of the email
        email.attach_alternative(message_html, "text/html")

        # Send the email
        email.send(fail_silently=False)

    # Override send_mail for password reset customization
    def send_mail(self, template_prefix, email, context):
        if "uid" in context and "token" in context:
            # Customize password reset URL to point to your frontend
            HOST = config("SEND_VERIFICATION_URL_HOST", cast=str, default="localhost")
            PORT = config("SEND_VERIFICATION_URL_PORT", cast=str, default="3000")

            password_reset_url = f"http://{HOST}:{PORT}/password-reset-confirm/{context['uid']}/{context['token']}/"
            context["password_reset_url"] = password_reset_url

        # Prepare context for the email template
        email_template_txt = "user_account/email/password_reset_key_message.txt"
        email_template_html = "user_account/email/password_reset_key_message.html"

        # Render the plain text and HTML email templates
        message_txt = render_to_string(email_template_txt, context)
        message_html = render_to_string(email_template_html, context)

        subject = "Reset Your Password"
        # Create the multi-part email object
        email_message = EmailMultiAlternatives(
            subject,
            message_txt,
            settings.DEFAULT_FROM_EMAIL,
            [email],
        )

        # Attach the HTML version of the email
        email_message.attach_alternative(message_html, "text/html")

        # Send the email
        email_message.send(fail_silently=False)
