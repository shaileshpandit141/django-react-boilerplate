import { createSlice } from "@reduxjs/toolkit"
import { userThunk } from '../thunks/userThunk'

const initialState = {
    response: null,
    status: 'idle',
    error: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(userThunk.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(userThunk.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.response = action.payload
            })
            .addCase(userThunk.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload
            })
    }
})

export default userSlice.reducer