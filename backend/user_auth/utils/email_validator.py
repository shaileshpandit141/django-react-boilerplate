import re


def validate_email(email):
    regex = r"^[^\s@]+@[^\s@]+\.[^\s@]+$"
    return re.match(regex, email) is not None


# Example usage
if __name__ == "__main__":
    email = "example@example.com"
    if validate_email(email):
        print("Email is valid!")
    else:
        print("Invalid email address.")
