import { createSlice } from '@reduxjs/toolkit'
import { signoutThunk } from '../thunks/signoutThunk'

// Initial State
const initialState = {
  status: 'idle',
  data: null,
  error: null,
}

// Creating signout Slice
const signoutSlice = createSlice({
  name: 'signout',
  initialState,
  reducers: {
    resetSignoutState: (state) => {
      state.status = 'idle'
      state.data = null
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signoutThunk.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(signoutThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(signoutThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  },
})

const signoutReducer = signoutSlice.reducer
const { resetSignoutState } = signoutSlice.actions

export default signoutReducer
export { resetSignoutState }
