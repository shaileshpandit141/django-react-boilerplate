import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../api'

export const signupThunk = createAsyncThunk(
  'auth/signup',
  async (credentials, thunkAPI) => {
    try {
      const response = await api.signupApi(credentials)
      return response.data
    } catch (error) {
      const errorResponse = error.response ? error.response.data : error.message
      return thunkAPI.rejectWithValue(errorResponse)
    }
  }
)
