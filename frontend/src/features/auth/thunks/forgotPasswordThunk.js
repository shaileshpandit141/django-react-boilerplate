import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../api'

export const forgotPasswordThunk = createAsyncThunk(
    'forgotPasswordSlice/forgotPasswordThunk',
    async (credentials, thunkAPI) => {
        try {
            const response = await api.forgotPasswordApi(credentials)
            return response.data
        } catch (error) {
            const errorResponse = error.response ? error.response.data : error.message
            return thunkAPI.rejectWithValue(errorResponse)
        }
    }
) 

export const forgotPasswordConfirmThunk = createAsyncThunk(
    'forgotPasswordSlice/forgotPasswordConfirmThunk',
    async (credentials, thunkAPI) => {
        try {
            const response = await api.forgotPasswordConfirmApi(credentials)
            return response.data
        } catch (error) {
            const errorResponse = error.response ? error.response.data : error.message
            return thunkAPI.rejectWithValue(errorResponse)
        }
    }
) 