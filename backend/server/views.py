from django.http import JsonResponse
from django.views.generic import TemplateView


def custom_404_view(request, exception=None):
    return JsonResponse(
        {
          "status": 400,
          "error": "Not Found",
          "message": "The endpoint you requested was not found."
        },
        status=404
    )


class IndexTemplateView(TemplateView):
    template_name = "index.html"
