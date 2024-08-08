import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../../api/axiosInstance'

export const userAPI = createAsyncThunk('user/userAPI', async () => {
    const response = await axiosInstance.get(`http://localhost:8000/api/auth/user/`)
    return response.data;
})
