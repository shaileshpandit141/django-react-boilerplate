import { createAsyncThunk } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import axiosInstance from '../../api/axiosInstance'

export const fetchCurrentUser = createAsyncThunk('currentUser/fetchCurrentUser', async () => {
    const access = localStorage.getItem('access') || null
    const { user_id } = jwtDecode(access);
    const response = await axiosInstance.get(`http://localhost:8000/api/auth/user/${user_id}/`)
    return response.data;
})
