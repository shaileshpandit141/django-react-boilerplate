import { createSlice } from '@reduxjs/toolkit';
import { login } from './loginAPI'
import { refreshToken } from './refreshTokenAPI'
import { register } from './registerAPI'

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
