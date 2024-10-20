import { createSlice } from '@reduxjs/toolkit'
import { signupThunk } from '../thunks/signupThunk'

// Initial State
const initialState = {
  status: 'idle',
  data: null,
  error: null,
}

// signup Slice
const signupSlice = createSlice({
  name: 'signup',
  initialState,
  reducers: {
    resetSignupState: (state) => {
      state.status = 'idle'
      state.data = null
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupThunk.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(signupThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(signupThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  },
})

const signupReducer = signupSlice.reducer
const { resetSignupState } = signupSlice.actions

export default signupReducer
export { resetSignupState }
