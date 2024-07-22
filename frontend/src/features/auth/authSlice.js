import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define async thunk for login
export const login = createAsyncThunk('auth/login', async (credentials) => {
    const response = await axios.post('http://localhost:8000/auth/api/token/', credentials);
    return response.data;
});

// Define async thunk for token refresh
export const refreshToken = createAsyncThunk('auth/refreshToken', async () => {
    const response = await axios.post('http://localhost:8000/auth/api/token/refresh/', {
        refresh: localStorage.getItem('refresh'),
    });
    return response.data;
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        email: localStorage.getItem("email") || null,
        first_name: localStorage.getItem("first_name") || null,
        last_name: localStorage.getItem("last_name") || null,
        access: localStorage.getItem('access') || null,
        refresh: localStorage.getItem('refresh') || null,
        status: 'idle',
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.email = null;
            state.first_name = null;
            state.last_name = null
            state.access = null;
            state.refresh = null;
            localStorage.removeItem("email");
            localStorage.removeItem("first_name");
            localStorage.removeItem("last_name");
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.email = action.payload.email;
                state.first_name = action.payload.first_name
                state.last_name = action.payload.last_name
                state.access = action.payload.access;
                state.refresh = action.payload.refresh;
                localStorage.setItem("email", action.payload.email);
                localStorage.setItem("first_name", action.payload.first_name);
                localStorage.setItem("last_name", action.payload.last_name);
                localStorage.setItem('access', action.payload.access);
                localStorage.setItem('refresh', action.payload.refresh);
            })
            .addCase(refreshToken.fulfilled, (state, action) => {
                state.access = action.payload.access;
                localStorage.setItem('access', action.payload.access);
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
