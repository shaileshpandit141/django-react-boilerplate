#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
from decouple import config


def main():
    """Run administrative tasks."""
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "server.settings")

    # Check for HOST and PORT using python-decouple
    host = config("HOST", default="localhost")
    port = config("PORT", default="8000")

    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc

    # Add the runserver command with the specified HOST and PORT
    if len(sys.argv) == 1 or sys.argv[1] == "runserver":
        sys.argv = sys.argv[:2] + [f"{host}:{port}"]

    execute_from_command_line(sys.argv)


if __name__ == "__main__":
    main()
