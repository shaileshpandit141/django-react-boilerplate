import { createSlice } from '@reduxjs/toolkit'
import { forgotPasswordThunk, forgotPasswordConfirmThunk } from '../thunks/forgotPasswordThunk'

// Initial State
const initialState = {
  status: 'idle',
  data: null,
  error: null,
}

// forgotPassword Slice
const forgotPasswordSlice = createSlice({
  name: 'forgotPasswordSlice',
  initialState,
  reducers: {
    resetForgotPasswordState: (state) => {
      state.status = 'idle'
      state.data = null
      state.error = null
    }
  },
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
export const { resetForgotPasswordState } = forgotPasswordSlice.actions
