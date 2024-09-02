import { createAsyncThunk } from '@reduxjs/toolkit' 
import userApi from './userApi' 

export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async (_, thunkAPI) => {
        try {
            const response = await userApi.fetchUser() 
            return response.data 
        } catch (error) {
            const errorResponse = error.response ? error.response.data : error.message
            return thunkAPI.rejectWithValue(errorResponse) 
        }
    }
) 