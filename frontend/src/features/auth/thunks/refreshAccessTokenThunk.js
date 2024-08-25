import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/api';

export const refreshAccessToken = createAsyncThunk(
    'auth/refreshAccessToken',
    async (credentials, thunkAPI) => {
        const refreshToken = thunkAPI.getState().auth.refreshToken;
        try {
            const response = await api.refreshAccessToken({ refresh: refreshToken });
            return response.data;
        } catch (error) {
            const errorResponse = error.response ? error.response.data : error.message
            return thunkAPI.rejectWithValue(errorResponse);
        }
    }
);