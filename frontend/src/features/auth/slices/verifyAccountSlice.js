import { createSlice } from '@reduxjs/toolkit';
import { verifyAccount } from '../thunks/verifyAccountThunk';

// Initial State
const initialState = {
    data: null,
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
            .addCase(verifyAccount.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(verifyAccount.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload
            })
            .addCase(verifyAccount.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
    },
});

export default verifyAccountSlice.reducer;
