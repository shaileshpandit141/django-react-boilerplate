import { createSlice } from '@reduxjs/toolkit' 
import { resendVerificationKeyThunk } from '../thunks/resendVerificationKeyThunk' 

// Initial State
const initialState = {
    response: null,
    status: 'idle',
    error: null,
} 

// signup Slice
const resendVerificationKeySlice = createSlice({
    name: 'resendVerificationKey',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(resendVerificationKeyThunk.pending, (state) => {
                state.status = 'loading' 
            })
            .addCase(resendVerificationKeyThunk.fulfilled, (state, action) => {
                state.status = 'succeeded' 
                state.response = action.payload 
            })
            .addCase(resendVerificationKeyThunk.rejected, (state, action) => {
                state.status = 'failed' 
                state.error = action.payload 
            })
    },
}) 

export default resendVerificationKeySlice.reducer 
