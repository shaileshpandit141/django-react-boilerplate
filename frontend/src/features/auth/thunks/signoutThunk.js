import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../api'

export const signoutThunk = createAsyncThunk(
  'auth/signout',
  async (credentials, thunkAPI) => {
    const refreshToken = thunkAPI.getState().signin.refreshToken
    try {
      const response = await api.signoutApi({ refresh_token: refreshToken })
      return response.data
    } catch (error) {
      const errorResponse = error.response ? error.response.data : error.message
      return thunkAPI.rejectWithValue(errorResponse)
    }
  }
)