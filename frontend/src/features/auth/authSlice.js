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

// Define async thunk for register
export const register = createAsyncThunk('auth/register', async (credentials) => {
    const response = await axios.post('http://localhost:8000/auth/api/register/', credentials)
    return response.data;
})

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        access: localStorage.getItem('access') || null,
        refresh: localStorage.getItem('refresh') || null,
        status: 'idle',
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.access = null;
            state.refresh = null;
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action) => {
                const { access, refresh } = action.payload
                state.status = 'successeded'
                state.access = access;
                state.refresh = refresh;
                localStorage.setItem('access', access);
                localStorage.setItem('refresh', refresh);
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message
            })
            .addCase(refreshToken.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(refreshToken.fulfilled, (state, action) => {
                const { access } = action.payload
                state.status = 'successeded'
                state.access = access;
                localStorage.setItem('access', access);
            })
            .addCase(refreshToken.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message
            })
            .addCase(register.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(register.fulfilled, (state, action) => {
                const { access, refresh } = action.payload
                state.status = 'successeded'
                state.access = access;
                state.refresh = refresh;
                localStorage.setItem('access', access);
                localStorage.setItem('refresh', refresh);
            })
            .addCase(register.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message
            })

    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
