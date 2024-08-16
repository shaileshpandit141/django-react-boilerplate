import axios from 'axios';
import { store } from '../config/store';
import { refreshAccessToken } from '../features/auth/authThunks';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/',
    timeout: 1000,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = store.getState().auth.accessToken;
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            await store.dispatch(refreshAccessToken());
            const newToken = store.getState().auth.accessToken;
            axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
            return axiosInstance(originalRequest);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
