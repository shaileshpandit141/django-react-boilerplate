import axios from 'axios'
import { store } from '../config/store'
import { refreshAccessTokenThunk } from '../features/auth'

const BASE_API_URL = process.env.REACT_APP_BASE_API_URL

const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  timeout: 1000,
})

axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().signin.accessToken
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      await store.dispatch(refreshAccessTokenThunk())
      const newToken = store.getState().signin.accessToken
      axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
      return axiosInstance(originalRequest)
    }
    return Promise.reject(error)
  }
)

export default axiosInstance
