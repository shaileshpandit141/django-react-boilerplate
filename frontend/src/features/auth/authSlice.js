import { createSlice } from '@reduxjs/toolkit';
import { login, refreshAccessToken, signup } from './authThunks'

// Initial State
const initialState = {
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    isAuthenticated: !!localStorage.getItem('refreshToken'),
    successSignup: null,
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
            .addCase(login.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const { access, refresh } = action.payload
                state.accessToken = access;
                state.refreshToken = refresh;
                state.isAuthenticated = true;
                localStorage.setItem('accessToken', access);
                localStorage.setItem('refreshToken', refresh)
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(refreshAccessToken.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const { access } = action.payload
                state.accessToken = access;
                state.isAuthenticated = true;
                localStorage.setItem('accessToken', access);
            })
            .addCase(refreshAccessToken.rejected, (state) => {
                state.accessToken = null;
                state.refreshToken = null;
                state.isAuthenticated = false;
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
            })
            .addCase(signup.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.successSignup = action.payload
            })
            .addCase(signup.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
