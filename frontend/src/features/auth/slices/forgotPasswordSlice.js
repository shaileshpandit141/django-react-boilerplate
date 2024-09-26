import { createSlice } from '@reduxjs/toolkit'
import { forgotPasswordThunk, forgotPasswordConfirmThunk } from '../thunks/forgotPasswordThunk'

// Initial State
const initialState = {
  status: 'idle',
  data: null,
  error: null,
}

// signup Slice
const forgotPasswordSlice = createSlice({
  name: 'forgotPasswordSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(forgotPasswordThunk.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(forgotPasswordThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(forgotPasswordThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(forgotPasswordConfirmThunk.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(forgotPasswordConfirmThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(forgotPasswordConfirmThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  },
})

export default forgotPasswordSlice.reducer
