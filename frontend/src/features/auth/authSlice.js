import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginAPI } from './loginAPI';
import { refreshAccessTokenAPI } from './refreshTokenAPI';
import { signupAPI } from './signupAPI';

// Initial State
const initialState = {
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    isAuthenticated: !!localStorage.getItem('refreshToken'),
    status: 'idle',
    error: null,
};


// Auth Slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.accessToken = null;
            state.refreshToken = null;
            state.isAuthenticated = false;
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAPI.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(loginAPI.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const { access, refresh } = action.payload
                state.accessToken = access;
                state.refreshToken = refresh;
                state.isAuthenticated = true;
                localStorage.setItem('accessToken', access);
                localStorage.setItem('refreshToken', refresh)
            })
            .addCase(loginAPI.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(refreshAccessTokenAPI.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const { access } = action.payload
                state.accessToken = access;
                state.isAuthenticated = true;
                localStorage.setItem('accessToken', access);
            })
            .addCase(refreshAccessTokenAPI.rejected, (state) => {
                state.accessToken = null;
                state.refreshToken = null;
                state.isAuthenticated = false;
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
            })
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
