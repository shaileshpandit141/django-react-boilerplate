import { createAsyncThunk } from '@reduxjs/toolkit'
import APIs from 'APIs'

export const signinThunk = createAsyncThunk(
  'auth/signinThunk',
  async (credentials, thunkAPI) => {
    try {
      const response = await APIs.signinApi(credentials)
      return response.data
    } catch (error) {
      const errorResponse = error.response ? error.response.data : error.message
      return thunkAPI.rejectWithValue(errorResponse)
    }
  }
)

export const refreshAccessTokenThunk = createAsyncThunk(
  'auth/refreshAccessToken',
  async (credentials, thunkAPI) => {
    const refreshToken = thunkAPI.getState().signin.refreshToken
    try {
      const response = await APIs.refreshAccessTokenApi({ refresh: refreshToken })
      return response.data
    } catch (error) {
      const errorResponse = error.response ? error.response.data : error.message
      return thunkAPI.rejectWithValue(errorResponse)
    }
  }
)
