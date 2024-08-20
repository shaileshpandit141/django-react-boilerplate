import { createSlice } from '@reduxjs/toolkit';
import { signup } from '../thunks/signupThunk';

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
            .addCase(signup.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload
            })
            .addCase(signup.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
    },
});

export default signupSlice.reducer;
