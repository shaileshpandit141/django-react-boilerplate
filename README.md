# Django and React Boilerplate with JWT Authentication

This project is a boilerplate for setting up a web application using Django for the backend with JWT (JSON Web Token) authentication, and React for the frontend.

## Features

- Django backend with custom user model (using username, email)
- JWT Authentication for all actions
- React frontend setup with Create React App
- Integration between Django and React

## Requirements

- Python 3.8+
- Node.js 14+
- npm (or yarn)
- PostgreSQL (or another preferred database)

## Setup Instructions

### Backend Setup (Django)

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/your-repo-name.git
    cd your-repo-name
    ```

2. **Create a virtual environment:**

    ```bash
    python3 -m venv venv
    source venv/bin/activate
    ```

3. **Install dependencies:**

    ```bash
    pip install -r requirements.txt
    ```

4. **Set up environment variables:**

    Create a `.env` file in the root directory and add the following:

    ```plaintext
    SECRET_KEY=your_secret_key
    DEBUG=True
    ALLOWED_HOSTS=localhost,127.0.0.1
    CORS_ALLOWED_ORIGINS=http://localhost:3000
    ```

5. **Apply migrations:**

    ```bash
    python manage.py migrate
    ```

6. **Create a superuser:**

    ```bash
    python manage.py createsuperuser
    ```

7. **Run the development server:**

    ```bash
    python manage.py runserver
    ```

### Frontend Setup (React)

1. **Navigate to the frontend directory:**

    ```bash
    cd frontend
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Run the React development server:**

    ```bash
    npm start
    ```

### Configuration


### Performing Authentication Actions API's

**Registration**:
- Send a POST request to `http://localhost:8000/api/auth/registration/` with user details (username, email, password1, password2).

**Login**:
- Send a POST request to `http://localhost:8000/api/auth/token/` with email and password to get access and refresh tokens.

**Logout**:
- Send a POST request to `http://localhost:8000/api/auth/logout/` to log out the user and blacklist the refresh token.

**Password Reset**:
- Send a POST request to `http://localhost:8000/api/auth/password/reset/` with the user’s email.

**Password Reset Verification**:
- Send a POST request to `http://localhost:8000/api/auth/password/reset/confirm/` with the new password and token received from the email.

**Email Verification**:
- Send a POST request to `http://localhost:8000/api/auth/registration/verify-email/` with the verification key received in the email.
  
**Re Email Verification**:
- Send a POST request to `http://localhost:8000/api/auth/resend-verification/` with the verification key received in the email.

**Token Refresh**:
- Send a POST request to `http://localhost:8000/api/auth/token/refresh/` with the refresh token to get a new access token.

**Access a protected endpoint for test**:
- Send a POST request to `http://localhost:8000/api/auth/protected/` with the refresh token to get a new access token.


### API's Usages using .rest file

- **Register a new user:**
    ```
    POST http://localhost:8000/api/auth/registration/
    Content-Type: application/json

    {
    "username": "username",
    "email": "email@example.com",
    "password1": "Email#12345@",
    "password2": "Email#12345@"
    }
    ```

- **Login to get JWT tokens**
    ```
    POST http://localhost:8000/api/auth/token/
    Content-Type: application/json

    {
    "username": "username",
    "email": "email@example.com",
    "password": "Email#12345@"
    }
    ```
    Note:
    - email is optional

    Expected response:
    ```
    {
    "access": "jwt_access_token",
    "refresh": "jwt_refresh_token"
    }
    ```

- **Logout (Blacklist the refresh token)**
    ```
    POST http://localhost:8000/api/auth/logout/
    Content-Type: application/json
    Authorization: Bearer jwt_access_token

    {
    "refresh_token": "jwt_refresh_token"
    }
    ```

- **Request password reset**
    ```
    POST ttp://localhost:8000/api/auth/password/reset/
    Content-Type: application/json

    {
    "email": "user@example.com"
    }
    ```
    Expected response:
    ```
    {
    "detail": "Password reset e-mail has been sent."
    }
    ```

- **Confirm password reset**
    ```
    POST http://localhost:8000/api/auth/password/reset/confirm/
    Content-Type: application/json

    {
    "uid": "uid_from_email",
    "token": "token_from_email",
    "new_password1": "new_strong_password123",
    "new_password2": "new_strong_password123"
    }
    ```
    Expected response:
    ```
    {
    "detail": "Password has been reset with the new password."
    }
    ```

- **Verify email**
    ```
    POST http://localhost:8000/api/auth/registration/verify-email/
    Content-Type: application/json

    {
    "key": "verification_key_from_email"
    }
    ```
    Expected response:
    ```
    {
    "detail": "ok"
    }
    ```    

- **Resend Verification Email**
    ```
    POST http://localhost:8000/api/auth/resend-verification/
    Authorization: Bearer <your_jwt_token>
    ```
    Expected response:
    ```
    {
    "detail": "Verification e-mail sent"
    }
    ``` 

- **Refresh JWT tokens**
    ```
    POST http://localhost:8000/api/auth/token/refresh/
    Content-Type: application/json

    {
    "refresh": "jwt_refresh_token"
    }
    ```
    Expected response:
    ```
    {
    "access": "new_jwt_access_token"
    }

- **Access a protected endpoint**
    ```
    GET http://localhost:8000/api/auth/protected/
    Authorization: Bearer jwt_access_token
    ```
    Expected response:
    ```
    {
    "message": "This is a protected view"
    }
    ```

- **Frontend:**

    The React frontend should handle authentication by storing the JWT tokens in localStorage or a similar mechanism and including the access token in the Authorization header for protected requests.

### Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

### License

This project is licensed under the MIT License. See the LICENSE file for details.
