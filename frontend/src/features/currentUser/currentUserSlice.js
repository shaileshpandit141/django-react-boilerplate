import { createSlice } from "@reduxjs/toolkit";
import { fetchCurrentUser } from './currentUserAPI'

const currentUserSlice = createSlice({
    name: 'currentUser',
    initialState: {
        user: {},
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCurrentUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.status = 'successeded';
                state.user = action.payload;
            })
            .addCase(fetchCurrentUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message
            })
    }
})

export default currentUserSlice.reducer