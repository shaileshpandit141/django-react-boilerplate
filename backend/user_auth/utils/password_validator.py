import re


def validate_password(password):
    # Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
    regex = r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
    return re.match(regex, password) is not None


# Example usage
if __name__ == "__main__":
    password = "Example@123"
    if validate_password(password):
        print("Password is valid!")
    else:
        print("Invalid password.")


"""
Explanation:
1.Validation Function: The validatePassword function uses a regular 
expression to ensure the password:

    1.Is at least 8 characters long.
    2.Contains at least one uppercase letter.
    3.Contains at least one lowercase letter.
    4.Contains at least one number.
    5.Contains at least one special character.

2.Example Usage: This shows how you can use the function to validate 
a password and log the result to the console.
"""
