import { createSlice } from "@reduxjs/toolkit";
import { userAPI } from './userAPI'

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo: {},
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(userAPI.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(userAPI.fulfilled, (state, action) => {
                state.status = 'successeded';
                state.userInfo = action.payload;
            })
            .addCase(userAPI.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message
            })
    }
})

export default userSlice.reducer