import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { setupInterceptors } from '../api/axiosInstance';


const store = configureStore({
    reducer: rootReducer
});

// Set up Axios interceptors after the store is configured
setupInterceptors(store);

export {store};