import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const refreshAccessTokenAPI = createAsyncThunk('auth/refreshToken', async (_, thunkAPI) => {
    try {
        const refreshToken = thunkAPI.getState().auth.refreshToken;
        const response = await axios.post('http://localhost:8000/api/auth/token/refresh/', { refresh: refreshToken });
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
