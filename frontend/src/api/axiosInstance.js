// axiosInstance.js
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { refreshTokenAPI } from '../features/auth/refreshTokenAPI';
import { logout } from '../features/auth/authSlice';
import { isTokenExpired } from '../utils/isTokenExpired';

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/',
});

export const setupInterceptors = (store) => {
    let isRefreshing = false;
    let failedQueue = [];

    const processQueue = (error, token = null) => {
        failedQueue.forEach(prom => {
            if (error) {
                prom.reject(error);
            } else {
                prom.resolve(token);
            }
        });
        failedQueue = [];
    };

    axiosInstance.interceptors.request.use((config) => {
        const accessToken = localStorage.getItem('access');
        if (accessToken && !isTokenExpired(accessToken)) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    axiosInstance.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;
            if (error.response && error.response.status === 401 && !originalRequest._retry) {
                const refreshToken = localStorage.getItem('refresh');

                if (isTokenExpired(refreshToken)) {
                    // If refresh token is expired, clear tokens and redirect to login
                    store.dispatch(logout())
                    window.location.href = '/login'; // Redirect to login page
                    return Promise.reject(error);
                }

                if (isRefreshing) {
                    return new Promise((resolve, reject) => {
                        failedQueue.push({ resolve, reject });
                    }).then(token => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return axiosInstance(originalRequest);
                    }).catch(err => {
                        return Promise.reject(err);
                    });
                }

                originalRequest._retry = true;
                isRefreshing = true;

                return new Promise(async (resolve, reject) => {
                    try {
                        const response = await store.dispatch(refreshTokenAPI());
                        const newAccess = response.payload.access;
                        localStorage.setItem('access', newAccess);
                        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccess}`;
                        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
                        processQueue(null, newAccess);
                        resolve(axiosInstance(originalRequest));
                    } catch (err) {
                        processQueue(err, null);
                        reject(err);
                    } finally {
                        isRefreshing = false;
                    }
                });
            }

            return Promise.reject(error);
        }
    );
};

export default axiosInstance;
