import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../api'

export const signinThunk = createAsyncThunk(
  'auth/signinThunk',
  async (credentials, thunkAPI) => {
    try {
      const response = await api.signinApi(credentials)
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
      const response = await api.refreshAccessTokenApi({ refresh: refreshToken })
      return response.data
    } catch (error) {
      const errorResponse = error.response ? error.response.data : error.message
      return thunkAPI.rejectWithValue(errorResponse)
    }
  }
)
