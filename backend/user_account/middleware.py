from django.utils.deprecation import MiddlewareMixin
from django.utils import timezone
import pytz


class DisableCSRFMiddleware(MiddlewareMixin):
    def process_view(self, request, view_func, view_args, view_kwargs):
        # Check if the URL pattern matches your API endpoints
        if request.path.startswith("/api/"):
            setattr(request, "_dont_enforce_csrf_checks", True)
        return None


class TimezoneMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        """
        Get the user's timezone from request (this can be done using
        cookies, session, or request headers)
        """
        tzname = request.session.get("timezone")

        # Set the timezone if valid
        if tzname in pytz.all_timezones:
            timezone.activate(pytz.timezone(tzname))
        else:
            # Use default timezone if no timezone is provided
            timezone.deactivate()

        response = self.get_response(request)
        return response
