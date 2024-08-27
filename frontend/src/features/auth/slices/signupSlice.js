import { createSlice } from '@reduxjs/toolkit';
import { signupThunk } from '../thunks/signupThunk';

// Initial State
const initialState = {
    data: null,
    status: 'idle',
    error: null,
};

// signup Slice
const signupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signupThunk.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(signupThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload
            })
            .addCase(signupThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
    },
});

export default signupSlice.reducer;
