import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define async thunk for token refresh
export const refreshTokenAPI = createAsyncThunk('auth/refreshToken', async () => {
    const response = await axios.post('http://localhost:8000/api/auth/token/refresh/', {
        refresh: localStorage.getItem('refresh'),
    });
    return response.data;
});