import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginAPI = createAsyncThunk('auth/login', async (credentials, thunkAPI) => {
    try {
        const response = await axios.post('http://localhost:8000/api/auth/token/', credentials);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data);
    }
});
