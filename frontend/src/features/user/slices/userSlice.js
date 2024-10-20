import { createSlice } from "@reduxjs/toolkit"
import { userThunk } from '../thunks/userThunk'

const initialState = {
  status: 'idle',
  data: null,
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
        state.data = action.payload
      })
      .addCase(userThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  }
})

const userReducer = userSlice.reducer

export default userReducer
