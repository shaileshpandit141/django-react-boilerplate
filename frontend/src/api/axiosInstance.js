import axios from 'axios';
import { refreshToken } from '../features/auth/refreshTokenAPI'

const axiosInstance = axios.create({
    // Use environment variable
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/',
});

// Export a function to set up interceptors later
export const setupInterceptors = (store) => {
    // Flag to prevent multiple token refreshes simultaneously
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
        const state = store.getState();
        const access_token = state.auth.access;
        if (access_token) {
            config.headers.Authorization = `Bearer ${access_token}`;
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    axiosInstance.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;
            if (error.response.status === 401 && !originalRequest._retry) {
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
                        await store.dispatch(refreshToken());
                        const state = store.getState();
                        const new_access_token = state.auth.access;
                        axios.defaults.headers.common['Authorization'] = `Bearer ${new_access_token}`;
                        originalRequest.headers.Authorization = `Bearer ${new_access_token}`;
                        processQueue(null, new_access_token);
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
