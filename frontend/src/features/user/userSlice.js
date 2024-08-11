import { createSlice } from "@reduxjs/toolkit";
import { fetchUser } from './userThunks'

const initialState = {
    userInfo: {},
    status: 'idle',
    error: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.userInfo = action.payload;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
    }
})

export default userSlice.reducer