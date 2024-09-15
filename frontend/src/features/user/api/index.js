import axiosInstance from "../../../api/axiosInstance"

export const api = {
    userApi: (credentials) => axiosInstance.get('api/auth/user/', credentials)
} 