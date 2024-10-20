import { createAsyncThunk } from '@reduxjs/toolkit'
import APIs from 'APIs'

export const verifyAccountThunk = createAsyncThunk(
  'verifyAccount/verifyAccount',
  async (credentials, thunkAPI) => {
    try {
      const response = await APIs.verifyAccountApi(credentials)
      return response.data
    } catch (error) {
      const errorResponse = error.response ? error.response.data : error.message
      return thunkAPI.rejectWithValue(errorResponse)
    }
  }
)
