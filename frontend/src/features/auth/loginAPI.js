import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define async thunk for login
export const login = createAsyncThunk('auth/login', async (credentials) => {
    const response = await axios.post('http://localhost:8000/api/auth/token/', credentials);
    return response.data;
});