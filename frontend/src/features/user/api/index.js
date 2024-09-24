import axiosInstance from "../../../axiosInstance/axiosInstance"

export const api = {
    userApi: (credentials) => axiosInstance.get('api/auth/user/', credentials)
} 