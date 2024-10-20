import { createSlice } from '@reduxjs/toolkit'
import { signinThunk, refreshAccessTokenThunk } from '../thunks/signinThunk'

// Initial State
const initialState = {
  status: 'idle',
  accessToken: localStorage.getItem('accessToken') || null,
  refreshToken: localStorage.getItem('refreshToken') || null,
  isAuthenticated: !!localStorage.getItem('refreshToken'),
  error: null,
}

// signin Slice
const signinSlice = createSlice({
  name: 'signin',
  initialState,
  reducers: {
    resetSigninState: (state) => {
      state.accessToken = null
      state.refreshToken = null
      state.isAuthenticated = false
      state.status = 'idle'
      state.error = null
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signinThunk.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(signinThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const { access, refresh } = action.payload
        state.accessToken = access
        state.refreshToken = refresh
        state.isAuthenticated = true
        localStorage.setItem('accessToken', access)
        localStorage.setItem('refreshToken', refresh)
      })
      .addCase(signinThunk.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      .addCase(refreshAccessTokenThunk.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const { access } = action.payload
        state.accessToken = access
        state.isAuthenticated = true
        localStorage.setItem('accessToken', access)
      })
      .addCase(refreshAccessTokenThunk.rejected, (state) => {
        state.accessToken = null
        state.refreshToken = null
        state.isAuthenticated = false
        state.status = 'idle'
        state.error = null
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
      })
  },
})

const signinReducer = signinSlice.reducer
const { resetSigninState } = signinSlice.actions

export default signinReducer
export { resetSigninState }

