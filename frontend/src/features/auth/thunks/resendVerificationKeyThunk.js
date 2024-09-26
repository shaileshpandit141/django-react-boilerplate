import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../api'

export const resendVerificationKeyThunk = createAsyncThunk(
  'resendVerificationKey/resendVerificationKey',
  async (credentials, thunkAPI) => {
    try {
      const response = await api.resendVerificationKeyApi(credentials)
      return response.data
    } catch (error) {
      const errorResponse = error.response ? error.response.data : error.message
      return thunkAPI.rejectWithValue(errorResponse)
    }
  }
)
