import axios from "axios";

const api = {
    login: (credentials) => axios.post('http://localhost:8000/api/auth/token/', credentials),
    refreshAccessToken: (credentials) => axios.post('http://localhost:8000/api/auth/token/refresh/', credentials),
    verifyAccount: (credentials) => axios.post('http://localhost:8000/api/auth/signup/verify-email/', credentials),
    signup: (credentials) => axios.post('http://localhost:8000/api/auth/signup/', credentials),
    resendVerificationKey: (credentials) => axios.post('http://localhost:8000/api/auth/resend-verification/', credentials),
};

export default api;
