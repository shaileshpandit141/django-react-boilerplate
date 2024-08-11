import { createAsyncThunk } from '@reduxjs/toolkit';
import userApi from './userApi';

export const fetchUser = createAsyncThunk(
    'user/fetchUser',
    async (_, thunkAPI) => {
        try {
            const response = await userApi.fetchUser();
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);