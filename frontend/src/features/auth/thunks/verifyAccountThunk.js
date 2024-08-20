import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/api';

export const verifyAccount = createAsyncThunk(
    'verifyAccount/verifyAccount',
    async (credentials, thunkAPI) => {
        try {
            const response = await api.verifyAccount(credentials);
            return response.data;
        } catch (error) {
            const errorResponse = error.response ? error.response.data : error.message
            return thunkAPI.rejectWithValue(errorResponse);
        }
    }
);