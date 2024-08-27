import { createSlice } from '@reduxjs/toolkit';
import { verifyAccountThunk } from '../thunks/verifyAccountThunk';

// Initial State
const initialState = {
    status: 'idle',
    error: null,
};

// signup Slice
const verifyAccountSlice = createSlice({
    name: 'verifyAccount',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(verifyAccountThunk.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(verifyAccountThunk.fulfilled, (state, action) => {
                state.status = 'succeeded';
            })
            .addCase(verifyAccountThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
    },
});

export default verifyAccountSlice.reducer;
