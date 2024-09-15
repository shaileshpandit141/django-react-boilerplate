import { createSlice } from '@reduxjs/toolkit'
import { jwtDecode } from 'jwt-decode';
import { loginThunk, refreshAccessTokenThunk } from '../thunks/authThunk'

// Initial State
const initialState = {
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    isAuthenticated: !!localStorage.getItem('refreshToken'),
    id: localStorage.getItem('accessToken') ? jwtDecode(localStorage.getItem('accessToken'))?.user_id : null,
    status: 'idle',
    error: null,
}

// auth Slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.accessToken = null
            state.refreshToken = null
            state.isAuthenticated = false
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginThunk.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(loginThunk.fulfilled, (state, action) => {
                state.status = 'succeeded'
                const { access, refresh } = action.payload
                state.accessToken = access
                state.refreshToken = refresh
                state.isAuthenticated = true
                localStorage.setItem('accessToken', access)
                localStorage.setItem('refreshToken', refresh)
            })
            .addCase(loginThunk.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            })
            .addCase(refreshAccessTokenThunk.fulfilled, (state, action) => {
                state.status = 'succeeded'
                const { access } = action.payload
                state.accessToken = access
                state.isAuthenticated = true
                localStorage.setItem('accessToken', access)
            })
            .addCase(refreshAccessTokenThunk.rejected, (state) => {
                state.accessToken = null
                state.refreshToken = null
                state.isAuthenticated = false
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
            })
    },
})

export const { logout } = authSlice.actions
export default authSlice.reducer 
