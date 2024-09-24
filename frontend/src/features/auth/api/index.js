import axios from "axios" 

const BASE_API_URL = process.env.REACT_APP_BASE_API_URL 

export const api = {
    signinApi: (credentials) => axios.post(BASE_API_URL + 'api/auth/token/', credentials),
    refreshAccessTokenApi: (credentials) => axios.post(BASE_API_URL + 'api/auth/token/refresh/', credentials),
    verifyAccountApi: (credentials) => axios.post(BASE_API_URL + 'api/auth/signup/verify-email/', credentials),
    signupApi: (credentials) => axios.post(BASE_API_URL + 'api/auth/signup/', credentials),
    resendVerificationKeyApi: (credentials) => axios.post(BASE_API_URL + 'api/auth/resend-verification/', credentials),
    forgotPasswordApi: (credentials) => axios.post(BASE_API_URL + 'api/auth/password/reset/ ', credentials),
    forgotPasswordConfirmApi: (credentials) => axios.post(BASE_API_URL + 'api/auth/password/reset/confirm/', credentials),
} 
