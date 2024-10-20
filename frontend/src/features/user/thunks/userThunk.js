import { createAsyncThunk } from '@reduxjs/toolkit'
import APIs from 'APIs'

export const userThunk = createAsyncThunk(
  'user/userThunk',
  async (credentials, thunkAPI) => {
    try {
      const response = await APIs.userApi(credentials)
      return response.data
    } catch (error) {
      const errorResponse = error.response ? error.response.data : error.message
      return thunkAPI.rejectWithValue(errorResponse)
    }
  }
)
