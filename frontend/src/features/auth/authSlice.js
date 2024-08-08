import { createSlice } from '@reduxjs/toolkit';
import { login } from './loginAPI'
import { refreshTokenAPI } from './refreshTokenAPI'
import { signupAPI } from './signupAPI'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        access: localStorage.getItem('access') || null,
        refresh: localStorage.getItem('refresh') || null,
        isAuthenticated: false,
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
                state.status = 'succeeded'
                state.access = access;
                state.refresh = refresh;
                localStorage.setItem('access', access);
                localStorage.setItem('refresh', refresh);
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message
            })
            .addCase(refreshTokenAPI.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(refreshTokenAPI.fulfilled, (state, action) => {
                const { access } = action.payload
                state.status = 'succeeded'
                state.access = access;
                localStorage.setItem('access', access);
            })
            .addCase(refreshTokenAPI.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message
            })
            .addCase(signupAPI.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(signupAPI.fulfilled, (state, action) => {
                const { access, refresh } = action.payload
                state.status = 'succeeded'
                state.access = access;
                state.refresh = refresh;
                localStorage.setItem('access', access);
                localStorage.setItem('refresh', refresh);
            })
            .addCase(signupAPI.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload
            })

    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
