import axios from 'axios';
import { store } from '../store';
import { refreshToken } from '../features/auth/authSlice';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/',
});

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
            originalRequest._retry = true;
            await store.dispatch(refreshToken());
            const state = store.getState();
            const new_access_token = state.auth.access;
            originalRequest.headers.Authorization = `Bearer ${new_access_token}`;
            return axiosInstance(originalRequest);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;