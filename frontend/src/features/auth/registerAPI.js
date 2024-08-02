import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define async thunk for register
export const register = createAsyncThunk('auth/register', async (credentials) => {
    const response = await axios.post('http://localhost:8000/api/auth/register/', credentials)
    return response.data;
})