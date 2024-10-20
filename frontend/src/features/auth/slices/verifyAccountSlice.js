import { createSlice } from '@reduxjs/toolkit'
import { verifyAccountThunk } from '../thunks/verifyAccountThunk'

// Initial State
const initialState = {
  status: 'idle',
  data: null,
  error: null,
}

// verifyAccount Slice
const verifyAccountSlice = createSlice({
  name: 'verifyAccount',
  initialState,
  reducers: {
    resetVerifyAccountState: (state) => {
      state.status = 'idle'
      state.data = null
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyAccountThunk.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(verifyAccountThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(verifyAccountThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  },
})

const verifyAccountReducer = verifyAccountSlice.reducer
const { resetVerifyAccountState } = verifyAccountSlice.actions

export default verifyAccountReducer
export { resetVerifyAccountState }
