import axios from "axios";

export const api = {
    loginApi: (credentials) => axios.post('http://localhost:8000/api/auth/token/', credentials),
    refreshAccessTokenApi: (credentials) => axios.post('http://localhost:8000/api/auth/token/refresh/', credentials),
    verifyAccountApi: (credentials) => axios.post('http://localhost:8000/api/auth/signup/verify-email/', credentials),
    signupApi: (credentials) => axios.post('http://localhost:8000/api/auth/signup/', credentials),
    resendVerificationKeyApi: (credentials) => axios.post('http://localhost:8000/api/auth/resend-verification/', credentials),
};

