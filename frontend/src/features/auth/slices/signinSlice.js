import { createSlice } from '@reduxjs/toolkit'
import { jwtDecode } from 'jwt-decode';
import { signinSliceThunk, refreshAccessTokenThunk } from '../thunks/signinSliceThunk'

// Initial State
const initialState = {
    status: 'idle',
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
    isAuthenticated: !!localStorage.getItem('refreshToken'),
    pk: localStorage.getItem('accessToken') ? jwtDecode(localStorage.getItem('accessToken'))?.user_id : null,
    error: null,
}

// auth Slice
const signinSlice = createSlice({
    name: 'signin',
    initialState,
    reducers: {
        signout: (state) => {
            state.accessToken = null
            state.refreshToken = null
            state.isAuthenticated = false
            state.pk = null
            state.status = 'idle'
            state.error = null
            localStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
        },
        resetSigninState: (state) => {
            state.status = 'idle'
            state.error = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signinSliceThunk.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(signinSliceThunk.fulfilled, (state, action) => {
                state.status = 'succeeded'
                const { access, refresh } = action.payload
                state.accessToken = access
                state.refreshToken = refresh
                state.isAuthenticated = true
                localStorage.setItem('accessToken', access)
                localStorage.setItem('refreshToken', refresh)
            })
            .addCase(signinSliceThunk.rejected, (state, action) => {
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
                state.pk = null
                state.status = 'idle'
                state.error = null
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
            })
    },
})

export const { signout, resetSigninState } = signinSlice.actions
export default signinSlice.reducer 
