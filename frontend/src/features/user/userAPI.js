import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../../api/axiosInstance'

export const userAPI = createAsyncThunk('user/userAPI', async (credentials, thunkAPI) => {
    try {
        const response = await axiosInstance.get(`api/auth/user/`)
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})
