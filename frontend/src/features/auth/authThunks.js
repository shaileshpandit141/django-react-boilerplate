import { createAsyncThunk } from '@reduxjs/toolkit';
import authApi from './authApi';

export const login = createAsyncThunk(
    'auth/login',
    async (credentials, thunkAPI) => {
        try {
            const response = await authApi.login(credentials);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const refreshAccessToken = createAsyncThunk(
    'auth/refreshAccessToken',
    async (credentials, thunkAPI) => {
        const refreshToken = thunkAPI.getState().auth.refreshToken;
        try {
            const response = await authApi.refreshAccessToken({ refresh: refreshToken });
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);

export const signup = createAsyncThunk(
    'auth/signup',
    async (credentials, thunkAPI) => {
        try {
            const response = await authApi.signup(credentials);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);
