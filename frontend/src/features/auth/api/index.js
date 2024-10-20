import axios from "axios"
import axiosInstance from "axiosInstance/axiosInstance"

const BASE_API_URL = process.env.REACT_APP_BASE_API_URL

export const api = {
  signinApi: (credentials) => axios.post(BASE_API_URL + 'api/auth/token/', credentials),
  signoutApi: (credentials) => axiosInstance.post(BASE_API_URL + 'api/auth/signout/', credentials),
  signupApi: (credentials) => axios.post(BASE_API_URL + 'api/auth/signup/', credentials),
  refreshAccessTokenApi: (credentials) => axios.post(BASE_API_URL + 'api/auth/token/refresh/', credentials),
  verifyAccountApi: (credentials) => axios.post(BASE_API_URL + 'api/auth/signup/verify-email/', credentials),
  resendVerificationKeyApi: (credentials) => axios.post(BASE_API_URL + 'api/auth/resend-verification/', credentials),
  forgotPasswordApi: (credentials) => axios.post(BASE_API_URL + 'api/auth/password/reset/ ', credentials),
  forgotPasswordConfirmApi: (credentials) => axios.post(BASE_API_URL + 'api/auth/password/reset/confirm/', credentials),
}
